import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import useDebounce from "../hooks/useDebounce";
import {
  Search,
  Archive,
  RotateCcw,
  Sparkles,
  Clock3,
  Plus,
  X,
  Filter,
  TrendingUp,
  Calendar,
  FileText,
} from "lucide-react";

import {
  createNote as createNoteService,
  archiveNote as archiveNoteService,
  restoreNote as restoreNoteService,
} from "../services/noteService";

const NotesSidebar = ({
  notes,
  setNotes,
  selectedNote,
  setSelectedNote,
  fetchNotes,
  showArchived,
  setShowArchived,
}) => {
  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [filterType, setFilterType] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const debouncedSearch =
  useDebounce(search, 400);

  // CREATE NOTE
  const createNote = async () => {
    try {
      setCreating(true);

      const newNote = {
        title: "",
        content: "",
        tags: [],
      };

      const data = await createNoteService(newNote);

      setNotes((prev) => [data, ...prev]);

      setSelectedNote(data);

      toast.success("New note created");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create note");
    } finally {
      setCreating(false);
    }
  };

  // ARCHIVE NOTE
  const archiveNote = async (e, noteId) => {
    e.stopPropagation();

    try {
      await archiveNoteService(noteId);

      toast.success("Note archived");

      fetchNotes(showArchived);
    } catch (error) {
      toast.error("Archive failed");
    }
  };

  // RESTORE NOTE
  const restoreNote = async (e, noteId) => {
    e.stopPropagation();

    try {
      await restoreNoteService(noteId);

      toast.success("Note restored");

      fetchNotes(showArchived);
    } catch (error) {
      toast.error("Restore failed");
    }
  };

  // FILTER NOTES
  const filteredNotes = useMemo(() => {
    let filtered = [...notes];

    // SEARCH
    filtered = filtered.filter(
  (note) =>
    note.title
      .toLowerCase()
      .includes(
        debouncedSearch.toLowerCase()
      ) ||

    note.content
      .toLowerCase()
      .includes(
        debouncedSearch.toLowerCase()
      )
);
    

    // AI FILTER
    if (filterType === "ai") {
      filtered = filtered.filter((note) => note.aiGenerated);
    }

    // OLD NOTES
    if (filterType === "old") {
      filtered.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    }

    // RECENT NOTES
    if (filterType === "recent") {
      filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    return filtered;
  }, [notes, debouncedSearch, filterType]);

  const filterButtonClass = (active) =>
    `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
      active
        ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-sm"
        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
    }`;

  return (
    <aside className="transform-gpu h-full w-full flex flex-col bg-[#FAFAFC] border-r border-gray-200">
      {/* HEADER */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-200 bg-white">
        {/* TITLE */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#7C3AED] flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5 text-white" />
            </div>

            <div>
              <h2 className="text-[18px] font-semibold text-gray-900 tracking-tight">
                Notes Workspace
              </h2>

              <p className="text-sm text-gray-500 mt-0.5">
                {filteredNotes.length}{" "}
                {filteredNotes.length === 1 ? "note" : "notes"}
              </p>
            </div>
          </div>

          <button
            onClick={createNote}
            disabled={creating}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              creating
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-sm"
            }`}
          >
            {creating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating
              </>
            ) : (
              <>
                <Plus size={16} />
                New
              </>
            )}
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search notes..."
            className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* FILTER TOGGLE */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Filter size={16} />
            Filters
          </div>

          <div
            className={`transition-transform duration-200 ${
              showFilters ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {/* FILTERS */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setFilterType("recent")}
              className={filterButtonClass(filterType === "recent")}
            >
              <TrendingUp size={13} />
              Recent
            </button>

            <button
              onClick={() => setFilterType("old")}
              className={filterButtonClass(filterType === "old")}
            >
              <Calendar size={13} />
              Old
            </button>

            <button
              onClick={() => setFilterType("ai")}
              className={filterButtonClass(filterType === "ai")}
            >
              <Sparkles size={13} />
              AI Notes
            </button>

            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
                showArchived
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-orange-600 border-orange-200 hover:bg-orange-50"
              }`}
            >
              <Archive size={13} />
              Archived
            </button>
          </div>
        )}
      </div>

      {/* NOTES LIST */}
      <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
        {filteredNotes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-5">
            <div className="w-16 h-16 rounded-2xl bg-[#F3F0FF] flex items-center justify-center mb-4">
              <Search className="w-7 h-7 text-[#7C3AED]" />
            </div>

            <h3 className="text-sm font-semibold text-gray-800 mb-1">
              No notes found
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotes.map((note) => {
              const isSelected = selectedNote?._id === note._id;

              return (
                <div
                  key={note._id}
                  onClick={() => setSelectedNote(note)}
                  className={`relative rounded-2xl border p-4 cursor-pointer transition-all duration-200 group ${
                    isSelected
                      ? "bg-white border-[#7C3AED] shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {/* ACTIVE INDICATOR */}
                  {isSelected && (
                    <div className="absolute left-0 top-5 bottom-5 w-1 bg-[#7C3AED] rounded-r-full"></div>
                  )}

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {note.title || "Untitled Note"}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock3 size={11} />

                          {new Date(note.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>

                        {note.aiGenerated && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F3F0FF] text-[#7C3AED]">
                            <Sparkles size={10} />
                            AI
                          </span>
                        )}
                      </div>
                    </div>

                    {!showArchived ? (
                      <button
                        onClick={(e) => archiveNote(e, note._id)}
                        className="opacity-0 group-hover:opacity-100 transition-all p-2 rounded-lg hover:bg-orange-50 text-orange-500"
                      >
                        <Archive size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => restoreNote(e, note._id)}
                        className="opacity-0 group-hover:opacity-100 transition-all p-2 rounded-lg hover:bg-green-50 text-green-600"
                      >
                        <RotateCcw size={16} />
                      </button>
                    )}
                  </div>

                  {/* CONTENT */}
                  <p className="text-sm text-gray-600 line-clamp-2 leading-6 mb-4">
                    {note.content || (
                      <span className="italic text-gray-400">
                        Start writing something...
                      </span>
                    )}
                  </p>

                  {/* TAGS */}
                  <div className="flex items-center flex-wrap gap-2">
                    {note.tags?.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}

                    {note.tags?.length > 3 && (
                      <span className="text-[11px] text-gray-400 font-medium">
                        +{note.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-200 bg-white px-5 py-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Workspace</span>

          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Synced
          </div>
        </div>
      </div>

      {/* CUSTOM SCROLLBAR */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4d4d8;
          border-radius: 999px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a1a1aa;
        }
      `}</style>
    </aside>
  );
};

export default NotesSidebar;
