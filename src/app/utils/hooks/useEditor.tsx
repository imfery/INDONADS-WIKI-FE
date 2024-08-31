import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef } from 'react';

import { loadEditorTools } from '@/constant/editorTools';

type UseEditorProps = {
    holderId: string;
};

export const useEditor = ({ holderId }: UseEditorProps) => {
    const editorInstanceRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        let isMounted = true; // Track if component is mounted

        const initializeEditor = async () => {
            if (
                typeof window !== 'undefined' &&
                isMounted &&
                !editorInstanceRef.current
            ) {
                try {
                    const tools = await loadEditorTools();
                    const holderElement = document.getElementById(holderId);

                    if (!holderElement) {
                        console.error(
                            `Element with ID "${holderId}" not found.`
                        );
                        return;
                    }

                    // Use dynamic imports inside useEffect to load EditorJS and plugins only on the client side
                    const { default: EditorJS } = await import(
                        '@editorjs/editorjs'
                    );
                    const { default: DragDrop } = await import(
                        'editorjs-drag-drop'
                    );
                    const { default: Undo } = await import('editorjs-undo');

                    editorInstanceRef.current = new EditorJS({
                        holder: holderId,
                        tools,
                        autofocus: true,
                        placeholder: 'Start typing your content here...',
                    });

                    editorInstanceRef.current.isReady
                        .then(() => {
                            if (!editorInstanceRef.current) return;

                            setTimeout(() => {
                                new DragDrop(editorInstanceRef.current!);
                                new Undo({
                                    editor: editorInstanceRef.current!,
                                });
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
            isMounted = false; // Cleanup: Mark component as unmounted
            if (editorInstanceRef.current) {
                editorInstanceRef.current.isReady
                    .then(() => {
                        editorInstanceRef.current?.destroy();
                        editorInstanceRef.current = null;
                        console.log('Editor.js instance destroyed');
                    })
                    .catch((e) =>
                        console.error('Error during Editor.js cleanup', e)
                    );
            }
        };
    }, [holderId]);

    return editorInstanceRef;
};
