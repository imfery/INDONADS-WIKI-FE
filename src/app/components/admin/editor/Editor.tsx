'use client';
import dynamic from 'next/dynamic';
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import '@/styles/editor.css';

// Dynamically import EditorWrapper with SSR disabled
const EditorWrapper = dynamic(
    () => import('@/app/components/admin/editor/EditorWrapper'),
    { ssr: false }
);

import { useEditor } from '@/app/utils/hooks/useEditor';

interface EditorRef {
    saveContent: () => Promise<EditorJS.OutputData | null>;
    loadContent: (content: any) => void;
}

interface EditorProps {
    initialData?: EditorJS.OutputData;
}

const Editor = forwardRef<EditorRef, EditorProps>(({ initialData }, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef = useEditor({ holderId: 'editorjs', initialData });
    const [isEditorReady, setIsEditorReady] = useState(false);

    useImperativeHandle(ref, () => ({
        saveContent: async () => {
            if (editorInstanceRef.current) {
                try {
                    const outputData = await editorInstanceRef.current.save();
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
                        console.error('Error loading editor content:', error)
                    );
            }
        },
    }));

    useEffect(() => {
        if (editorInstanceRef.current) {
            editorInstanceRef.current.isReady
                .then(() => {
                    setIsEditorReady(true);
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
    }, [initialData, editorInstanceRef]);

    return (
        <div>
            {/* Use the dynamically imported component here */}
            <EditorWrapper holderId='editorjs' initialData={initialData} />
        </div>
    );
});

Editor.displayName = 'Editor';

export default Editor;
