import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const Editor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your post...",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // send HTML to parent
    },
  });

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor