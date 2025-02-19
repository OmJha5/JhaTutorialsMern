import { BubbleMenu } from "@tiptap/react";
import { Bold, List, PaintBucket } from "lucide-react"; // Icons for UI
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 
import { BulletList } from '@tiptap/extension-bullet-list'; // Import BulletList extension

export default function Toolbar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="flex gap-2 bg-white p-2 shadow-md rounded-lg border">
      {/* Bold Button */}
      <Button 
        onClick={() => editor.chain().focus().toggleBold().run()} 
        variant={editor.isActive("bold") ? "default" : "outline"}
      >
        <Bold className="w-4 h-4" />
      </Button>

      {/* Unordered List Button */}
      <Button 
        onClick={() => editor.chain().focus().toggleBulletList().run()} 
        variant={editor.isActive("bulletList") ? "default" : "outline"}
      >
        <List className="w-4 h-4" /> {/* Icon for Unordered List */}
      </Button>

      {/* Color Picker */}
      <div className="flex items-center gap-2">
        <PaintBucket className="w-4 h-4" />
        <Input 
          type="color" 
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} 
          className="w-10 h-8 p-0 border-none cursor-pointer" 
        />
      </div>
    </BubbleMenu>
  );
}
