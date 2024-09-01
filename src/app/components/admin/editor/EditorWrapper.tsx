'use client';

import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

interface EditorWrapperProps {
    holderId: string;
    initialData?: EditorJS.OutputData;
}

const EditorWrapper: React.FC<EditorWrapperProps> = ({
    holderId,
    initialData,
}) => {
    const editorInstanceRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (!editorInstanceRef.current) {
            editorInstanceRef.current = new EditorJS({
                holder: holderId,
                data: initialData,
                placeholder: 'Start typing your content here...',
            });
        }

        return () => {
            if (editorInstanceRef.current) {
                editorInstanceRef.current.destroy();
                editorInstanceRef.current = null;
            }
        };
    }, [holderId, initialData]);

    return (
        <div
            id={holderId}
            style={{
                minHeight: '300px',
                border: '1px solid #ddd',
                padding: '10px',
            }}
        />
    );
};

export default EditorWrapper;
