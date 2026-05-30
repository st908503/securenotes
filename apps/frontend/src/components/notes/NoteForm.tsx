import { useState } from "react";

import Button from "../common/Button";
import { encryptNote } from "../../utils/encryption";

interface NoteFormProps {
  onSubmit: (title: string, encryptedContent: string) => void;

  loading?: boolean;
}

const NoteForm = ({ onSubmit, loading = false }: NoteFormProps) => {
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Encrypt Before Sending
    |--------------------------------------------------------------------------
    */

    const encryptedContent = encryptNote(content);

    onSubmit(title, encryptedContent);

    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-6 shadow-md"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Title
        </label>

        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Note
        </label>

        <textarea
          rows={5}
          placeholder="Write your secure note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <Button type="submit" loading={loading}>
        Add Secure Note
      </Button>
    </form>
  );
};

export default NoteForm;
