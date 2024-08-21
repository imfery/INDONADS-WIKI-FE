'use client';

import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

import styles from '@/styles/Tiptap.module.css';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      Link,
      CodeBlock,
      Blockquote,
      Placeholder.configure({
        placeholder: 'Start typing...',
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
    autofocus: true,
    editable: true,
    injectCSS: false,
  });

  useEffect(() => {
    if (editor) {
      // Autosave functionality
      editor.on('update', () => {
        const json = editor.getJSON();
        // Autosave logic here
        console.log('Autosave:', json);
      });
    }
  }, [editor]);

  if (!editor) {
    return null; // or a loading indicator
  }

  return (
    <div>
      {/* Toolbar */}
      <div className='toolbar'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? styles.isactive : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? styles.isactive : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? styles.isactive : ''}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? styles.isactive : ''}
        >
          Strike
        </button>
        {/* Add more buttons for other features like lists, links, etc. */}
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Manual Save Button */}
      <button
        onClick={() => {
          const json = editor.getHTML();
          console.log('Manual Save:', json);
          // Trigger manual save here
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Tiptap;
