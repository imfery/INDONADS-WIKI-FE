// Editor.tsx
'use client';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import '@/styles/editor.css';

import { useEditor } from '@/app/utils/hooks/useEditor';

const Editor = forwardRef((props, ref) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef = useEditor({ holderId: 'editorjs' });

    // Expose saveContent function to parent component via ref
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
    }));

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
});

Editor.displayName = 'Editor'; // Adding displayName for debugging purposes

export default Editor;
