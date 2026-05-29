import {
  useEffect,
  useState,
} from "react";
import { useDebounce } from "use-debounce";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import toast from "react-hot-toast";

import {
  createNote,
  deleteNote,
  fetchNotes,
} from "../features/notes/notesSlice";

import type {
  AppDispatch,
  RootState,
} from "../app/store";

import NoteCard from "../components/notes/NoteCard";
import NoteForm from "../components/notes/NoteForm";
import Loader from "../components/common/Loader";

import { logout } from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch =
    useDispatch<AppDispatch>();

const [search, setSearch] = useState("");

const [debouncedSearch] =
  useDebounce(search, 500);

  const { notes, loading } =
    useSelector(
      (state: RootState) =>
        state.notes
    );

useEffect(() => {
  dispatch(fetchNotes(debouncedSearch));
}, [dispatch, debouncedSearch]);

  const handleCreateNote = async (
    title: string,
    content: string
  ) => {
    const resultAction =
      await dispatch(
        createNote({
          title,
          content,
        })
      );

    if (
      createNote.fulfilled.match(
        resultAction
      )
    ) {
      toast.success(
        "Note added successfully"
      );
    }
  };

  const handleDeleteNote = async (
    id: string
  ) => {
    const resultAction =
      await dispatch(deleteNote(id));

    if (
      deleteNote.fulfilled.match(
        resultAction
      )
    ) {
      toast.success(
        "Note deleted successfully"
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Secure Notes
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <NoteForm
            onSubmit={handleCreateNote}
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {loading ? (
          <Loader />
        ) : notes.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-md">
            <p className="text-slate-500">
              No notes found
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={
                  handleDeleteNote
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;