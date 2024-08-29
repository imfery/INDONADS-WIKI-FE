'use client';
import EditorJS, { ToolConstructable } from '@editorjs/editorjs';
import React, { useEffect, useRef } from 'react';

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const initializeEditor = async () => {
      if (
        typeof window !== 'undefined' &&
        editorRef.current &&
        !editorInstanceRef.current
      ) {
        const EditorJS = (await import('@editorjs/editorjs')).default;
        const Header = (await import('@editorjs/header')).default;
        const Paragraph = (await import('@editorjs/paragraph')).default;

        console.log('Initializing Editor.js');

        editorInstanceRef.current = new EditorJS({
          holder: editorRef.current,
          tools: {
            header: {
              class: Header as unknown as ToolConstructable,
              inlineToolbar: ['link'],
              config: {
                placeholder: 'Enter a header',
              },
            },
            paragraph: {
              class: Paragraph as unknown as ToolConstructable,
              inlineToolbar: true,
            },
          },
          autofocus: true,
          placeholder: 'Start typing your content here...',
        });

        editorInstanceRef.current.isReady
          .then(() => {
            console.log('Editor.js is ready');
          })
          .catch((error) => {
            console.error('Editor.js initialization failed:', error);
          });
      }
    };

    initializeEditor();

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.isReady
          .then(() => {
            editorInstanceRef.current?.destroy(); // Destroy the instance safely
            editorInstanceRef.current = null; // Reset the instance ref after destroying
            console.log('Editor.js instance destroyed');
          })
          .catch((e) => console.error('Error during Editor.js cleanup', e));
      }
    };
  }, []);

  return (
    <div
      ref={editorRef}
      className='editor-container'
      style={{ minHeight: '300px', border: '1px solid #ddd', padding: '10px' }}
    ></div>
  );
};

export default Editor;
