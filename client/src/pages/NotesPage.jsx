import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import useDocumentTitle from "../hooks/useDocumentTitle";

import { FileText, Sparkles, PenSquare, Menu, X } from "lucide-react";

import NotesSidebar from "../components/NotesSidebar";
import NoteEditor from "../components/NoteEditor";

import { getNotes } from "../services/noteService";

const NotesPage = () => {
  useDocumentTitle("My Notes");
  const [notes, setNotes] = useState([]);

  const [selectedNote, setSelectedNote] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showArchived, setShowArchived] = useState(false);

  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    fetchNotes(showArchived);
  }, [showArchived]);

  // FETCH NOTES
  const fetchNotes = async (archived = false) => {
    try {
      setLoading(true);

      const data = await getNotes(archived);

      setNotes(data);

      if (data.length > 0) {
        setSelectedNote(data[0]);
      } else {
        setSelectedNote(null);
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-screen bg-[#F8F9FC] flex items-center justify-center px-4">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm px-8 py-8 flex flex-col items-center max-w-sm w-full">
            <div className="w-14 h-14 rounded-2xl bg-[#F3F0FF] flex items-center justify-center mb-5">
              <Sparkles className="w-7 h-7 text-[#7C3AED] animate-pulse" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Loading Workspace
            </h2>

            <p className="text-sm text-gray-500 text-center leading-relaxed">
              Fetching your notes and preparing your collaborative workspace.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-[#F8F9FC] flex">
      {/* MOBILE SIDEBAR OVERLAY */}
      {mobileSidebar && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:relative z-50 md:z-0
          h-full
          w-[320px] md:w-[360px]
          bg-white
          border-r border-gray-200
          transition-transform duration-300
          ${
            mobileSidebar
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* MOBILE CLOSE */}
        <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7C3AED] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Peblo Notes
              </h2>

              <p className="text-xs text-gray-500">AI Workspace</p>
            </div>
          </div>

          <button
            onClick={() => setMobileSidebar(false)}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        <NotesSidebar
          notes={notes}
          setNotes={setNotes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          fetchNotes={fetchNotes}
          showArchived={showArchived}
          setShowArchived={setShowArchived}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAVBAR */}
        <div className="h-[72px] border-b border-gray-200 bg-white/90 backdrop-blur-md px-4 md:px-8 flex items-center justify-between shrink-0">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* MOBILE MENU */}
            <button
              onClick={() => setMobileSidebar(true)}
              className="md:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Menu size={18} className="text-gray-700" />
            </button>

            <div>
              <h1 className="text-lg md:text-2xl font-semibold text-gray-900 tracking-tight">
                Collaborative Notes
              </h1>

              <p className="text-sm text-gray-500 mt-0.5">
                AI-powered workspace for smarter note management
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F3FF] border border-[#DDD6FE]">
              <Sparkles size={14} className="text-[#7C3AED]" />

              <span className="text-xs font-medium text-[#6D28D9]">
                AI Enabled
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>

              <span className="text-xs font-medium text-green-700">Synced</span>
            </div>
          </div>
        </div>

        {/* EDITOR AREA */}
        <div className="flex-1 overflow-hidden">
          {selectedNote ? (
            <div className="h-full overflow-y-auto">
              <NoteEditor
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                notes={notes}
                setNotes={setNotes}
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center px-6">
              <div className="max-w-md w-full text-center">
                <div className="w-20 h-20 rounded-3xl bg-[#F3F0FF] flex items-center justify-center mx-auto mb-6">
                  <PenSquare className="w-9 h-9 text-[#7C3AED]" />
                </div>

                <h2 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
                  No Note Selected
                </h2>

                <p className="text-gray-500 leading-relaxed mb-8">
                  Select an existing note or create a new one to begin writing
                  and collaborating with AI assistance.
                </p>

                <button
                  onClick={() => setMobileSidebar(true)}
                  className="md:hidden inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-all duration-200"
                >
                  <Menu size={16} />
                  Open Notes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
