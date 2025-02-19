import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Toolbar from "./Toolbar"; // Import the toolbar

const EditableCell = ({ value, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit, // StarterKit already includes BulletList, so no need to add it here
      TextStyle, 
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      // Get the HTML content
      let html = editor.getHTML();
      
      // Remove <p> tags but keep their content
      html = html.replace(/<p>/g, '').replace(/<\/p>/g, '');

      onUpdate(html);
    },
  });

  return (
    <>
      {editor && <Toolbar editor={editor} />} {/* Pass the editor to Toolbar */}
      <EditorContent editor={editor} className="p-2 h-full" />
    </>
  );
};

export default EditableCell;
