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
  const decryptedContent = decryptNote(
    note.content
  );

  return (
    <div className="rounded-xl bg-white p-5 shadow-md transition hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {note.title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {new Date(
              note.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => onDelete(note._id)}
          className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <p className="whitespace-pre-wrap text-slate-700">
        {decryptedContent}
      </p>
    </div>
  );
};

export default NoteCard;