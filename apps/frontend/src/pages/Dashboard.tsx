import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { useDebounce } from "use-debounce";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";

import {
  createNote,
  deleteNote,
  fetchNotes,
} from "../features/notes/notesSlice";

import type { AppDispatch, RootState } from "../app/store";

import NoteCard from "../components/notes/NoteCard";

import Loader from "../components/common/Loader";

import ConfirmModal from "../components/common/ConfirmModal";

import { logout } from "../features/auth/authSlice";

import Navbar from "../components/layout/Navbar";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const { notes, loading } = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes(debouncedSearch));
  }, [dispatch, debouncedSearch]);

  const handleCreateNote = async () => {
    if (!title || !content) {
      toast.error("Please fill all fields");

      return;
    }

    const resultAction = await dispatch(
      createNote({
        title,
        content,
      }),
    );

    if (createNote.fulfilled.match(resultAction)) {
      toast.success("Note added successfully");

      setTitle("");
      setContent("");

      setShowForm(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    const resultAction = await dispatch(deleteNote(id));

    if (deleteNote.fulfilled.match(resultAction)) {
      toast.success("Note deleted successfully");
    }
  };

  const confirmLogout = () => {
    dispatch(logout());

    toast.success("Logged out");

    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen bg-[#ececf1] px-4 py-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <Navbar onLogout={() => setShowLogoutModal(true)} />

        <div className="p-6">
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-lg font-medium shadow-sm hover:bg-slate-50"
            >
              Add Note
            </button>

            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-[#f8f8f8] py-3 pl-12 pr-4 text-lg outline-none focus:border-[#3b82f6]"
              />
            </div>
          </div>

          {showForm && (
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-[#3b82f6]"
                />

                <textarea
                  rows={5}
                  placeholder="Write your secure note..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-[#3b82f6]"
                />

                <button
                  onClick={handleCreateNote}
                  className="rounded-lg bg-[#3b82f6] px-6 py-3 font-medium text-white hover:bg-[#2563eb]"
                >
                  Save Note
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <Loader />
          ) : notes.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
              <p className="text-slate-500">No notes found</p>
            </div>
          ) : (
            <div className="space-y-5">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </div>
  );
};

export default Dashboard;
