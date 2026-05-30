import { Trash2 } from "lucide-react";

import type { Note } from "../../types";

import { decryptNote } from "../../utils/encryption";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteCard = ({
  note,
  onDelete,
}: NoteCardProps) => {
  const decryptedContent =
    decryptNote(note.content);

  return (
    <div className="flex items-start justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Left Content */}
      <div className="flex-1">
        <h2 className="mb-2 text-2xl font-semibold text-slate-800">
          {note.title}
        </h2>

        <p className="line-clamp-2 whitespace-pre-wrap text-lg text-slate-500">
          {decryptedContent}
        </p>

        <p className="mt-3 text-sm text-slate-400">
          {new Date(
            note.createdAt
          ).toLocaleString()}
        </p>
      </div>

      {/* Delete Button */}
      <button
        onClick={() =>
          onDelete(note._id)
        }
        className="ml-6 mt-1 text-slate-400 transition hover:text-red-500"
      >
        <Trash2 size={26} />
      </button>
    </div>
  );
};

export default NoteCard;