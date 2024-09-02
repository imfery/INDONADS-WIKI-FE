'use client';
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import '@/styles/editor.css';
import { useEditor } from '@/app/utils/hooks/useEditor';

interface EditorRef {
    saveContent: () => Promise<EditorJS.OutputData | null>;
    loadContent: (content: any) => void;
}

interface EditorProps {
    initialData?: EditorJS.OutputData;
    onReady?: () => void; // Add onReady prop
}

const Editor = forwardRef<EditorRef, EditorProps>(
    ({ initialData, onReady }, ref) => {
        const editorRef = useRef<HTMLDivElement>(null);
        const editorInstanceRef = useEditor({
            holderId: 'editorjs',
            initialData,
        });
        const [isEditorReady, setIsEditorReady] = useState(false);

        useImperativeHandle(ref, () => ({
            saveContent: async () => {
                if (editorInstanceRef.current) {
                    try {
                        const outputData =
                            await editorInstanceRef.current.save();
                        console.log('Editor.js JSON Output:', outputData);
                        return outputData;
                    } catch (error) {
                        console.error('Error saving editor content:', error);
                        return null;
                    }
                }
                return null;
            },
            loadContent: (content) => {
                if (editorInstanceRef.current && isEditorReady) {
                    editorInstanceRef.current
                        .render({
                            blocks: content.blocks,
                        })
                        .catch((error) =>
                            console.error(
                                'Error loading editor content:',
                                error
                            )
                        );
                }
            },
        }));

        useEffect(() => {
            if (editorInstanceRef.current) {
                editorInstanceRef.current.isReady
                    .then(() => {
                        setIsEditorReady(true);
                        onReady && onReady(); // Call onReady if defined
                        if (initialData) {
                            editorInstanceRef
                                .current!.render({
                                    blocks: initialData.blocks,
                                })
                                .catch((error) =>
                                    console.error(
                                        'Error loading initial content:',
                                        error
                                    )
                                );
                        }
                    })
                    .catch((error) =>
                        console.error('Error during editor ready state:', error)
                    );
            }

            return () => {
                if (editorInstanceRef.current) {
                    editorInstanceRef.current.isReady
                        .then(() => {
                            editorInstanceRef.current?.destroy();
                            editorInstanceRef.current = null;
                        })
                        .catch((error) =>
                            console.error('Error during editor cleanup:', error)
                        );
                }
            };
        }, [initialData, editorInstanceRef, onReady]);

        return (
            <div>
                <div
                    id='editorjs'
                    ref={editorRef}
                    className='editor-container mt-10'
                    style={{
                        minHeight: '300px',
                        border: '1px solid #ddd',
                        padding: '10px',
                    }}
                ></div>
            </div>
        );
    }
);

Editor.displayName = 'Editor';

export default Editor;
