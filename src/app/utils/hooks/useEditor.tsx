import EditorJS from '@editorjs/editorjs';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import { useEffect, useRef } from 'react';

import { loadEditorTools } from '@/constant/editorTools';

type UseEditorProps = {
    holderId: string;
    initialData?: EditorJS.OutputData;
    readOnly?: boolean;
};

export const useEditor = ({
    holderId,
    initialData,
    readOnly = false,
}: UseEditorProps) => {
    const editorInstanceRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        let isMounted = true;

        const initializeEditor = async () => {
            if (!editorInstanceRef.current && isMounted) {
                try {
                    const tools = await loadEditorTools();
                    editorInstanceRef.current = new EditorJS({
                        holder: holderId,
                        tools,
                        autofocus: true,
                        data: initialData,
                        placeholder: 'Start typing your content here...',
                        readOnly,
                    });

                    editorInstanceRef.current.isReady
                        .then(() => {
                            if (!editorInstanceRef.current) return;

                            setTimeout(() => {
                                new DragDrop(editorInstanceRef.current);
                                new Undo({ editor: editorInstanceRef.current });
                            }, 100);
                        })
                        .catch((error) => {
                            console.error(
                                'Editor.js initialization failed:',
                                error
                            );
                        });
                } catch (error) {
                    console.error('Failed to initialize Editor.js:', error);
                }
            }
        };

        initializeEditor();

        return () => {
            isMounted = false;
            if (editorInstanceRef.current) {
                editorInstanceRef.current.isReady
                    .then(() => {
                        editorInstanceRef.current?.destroy();
                        editorInstanceRef.current = null;
                    })
                    .catch((e) =>
                        console.error('Error during Editor.js cleanup', e)
                    );
            }
        };
    }, [holderId, initialData, readOnly]);

    return editorInstanceRef;
};
