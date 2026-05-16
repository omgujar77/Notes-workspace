import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Search,
  Archive,
  RotateCcw,
  Sparkles,
  Clock3,
} from "lucide-react";

import API from "../services/noteService";

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

  const [creating, setCreating] =
    useState(false);

  // const [showArchived, setShowArchived] =
  //   useState(false);

  const [filterType, setFilterType] =
    useState("recent");

  // CREATE NOTE
  const createNote = async () => {
    try {

      setCreating(true);

      const newNote = {
        title: "",
        content: "",
        tags: [],
      };

      const { data } =
        await API.post("/", newNote);

      setNotes((prev) => [
        data,
        ...prev,
      ]);

      setSelectedNote(data);

      toast.success(
        "New note created"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to create note"
      );

    } finally {

      setCreating(false);
    }
  };

  // ARCHIVE NOTE
  const archiveNote = async (
    e,
    noteId
  ) => {

    e.stopPropagation();

    try {

      await API.patch(
        `/archive/${noteId}`
      );

      toast.success(
        "Note archived"
      );

      fetchNotes(showArchived);

    } catch (error) {

      toast.error(
        "Archive failed"
      );
    }
  };

  // RESTORE NOTE
  const restoreNote = async (
    e,
    noteId
  ) => {

    e.stopPropagation();

    try {

      await API.patch(
        `/restore/${noteId}`
      );

      toast.success(
        "Note restored"
      );

      fetchNotes(showArchived);

    } catch (error) {

      toast.error(
        "Restore failed"
      );
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
            search.toLowerCase()
          ) ||
        note.content
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

    // AI FILTER
    if (filterType === "ai") {

      filtered = filtered.filter(
        (note) => note.aiGenerated
      );
    }

    // OLD NOTES
    if (filterType === "old") {

      filtered.sort(
        (a, b) =>
          new Date(a.updatedAt) -
          new Date(b.updatedAt)
      );
    }

    // RECENT NOTES
    if (filterType === "recent") {

      filtered.sort(
        (a, b) =>
          new Date(b.updatedAt) -
          new Date(a.updatedAt)
      );
    }

    return filtered;

  }, [notes, search, filterType]);

  return (
    <div className="h-full flex flex-col bg-white border-r">

      {/* HEADER */}
      <div className="p-4 border-b">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-xl font-bold">
            Notes
          </h2>

          <button
            onClick={createNote}
            disabled={creating}
            className={`text-sm px-3 py-2 rounded-lg text-white transition ${
              creating
                ? "bg-gray-400"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {creating
              ? "Creating..."
              : "New"}
          </button>

        </div>

        {/* SEARCH */}
        <div className="relative">

          <Search
            size={16}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search notes..."
            className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-2 mt-4">

          <button
            onClick={() =>
              setFilterType(
                "recent"
              )
            }
            className={`text-xs px-3 py-1 rounded-full border ${
              filterType ===
              "recent"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Recent
          </button>

          <button
            onClick={() =>
              setFilterType("old")
            }
            className={`text-xs px-3 py-1 rounded-full border ${
              filterType === "old"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            Old
          </button>

          <button
            onClick={() =>
              setFilterType("ai")
            }
            className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1 ${
              filterType === "ai"
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            <Sparkles size={12} />
            AI
          </button>

          <button
            onClick={() =>
              setShowArchived(
                !showArchived
              )
            }
            className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1 ${
              showArchived
                ? "bg-orange-500 text-white"
                : "bg-white"
            }`}
          >
            <Archive size={12} />

            Archived
          </button>

        </div>

      </div>

      {/* NOTES LIST */}
      <div className="flex-1 overflow-y-auto p-3">

        {filteredNotes.length === 0 ? (

          <div className="text-center text-gray-500 mt-10 text-sm">

            No notes found

          </div>

        ) : (

          filteredNotes.map((note) => (

            <div
              key={note._id}
              onClick={() =>
                setSelectedNote(
                  note
                )
              }
              className={`border rounded-xl p-3 mb-3 cursor-pointer transition ${
                selectedNote?._id ===
                note._id
                  ? "bg-gray-100 border-black"
                  : "hover:bg-gray-50"
              }`}
            >

              {/* TITLE */}
              <div className="flex items-start justify-between gap-2">

                <h2 className="font-semibold text-sm line-clamp-1">

                  {note.title ||
                    "Untitled"}

                </h2>

                {!showArchived ? (

                  <button
                    onClick={(e) =>
                      archiveNote(
                        e,
                        note._id
                      )
                    }
                    className="text-gray-500 hover:text-black"
                  >
                    <Archive size={15} />
                  </button>

                ) : (

                  <button
                    onClick={(e) =>
                      restoreNote(
                        e,
                        note._id
                      )
                    }
                    className="text-gray-500 hover:text-black"
                  >
                    <RotateCcw size={15} />
                  </button>

                )}

              </div>

              {/* CONTENT */}
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">

                {note.content ||
                  "Empty note"}

              </p>

              {/* FOOTER */}
              <div className="flex items-center justify-between mt-3">

                {/* TAGS */}
                <div className="flex flex-wrap gap-1">

                  {note.tags
                    ?.slice(0, 2)
                    .map(
                      (
                        tag,
                        index
                      ) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-[10px] px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      )
                    )}

                </div>

                {/* DATE */}
                <div className="flex items-center gap-1 text-[10px] text-gray-400">

                  <Clock3 size={10} />

                  {new Date(
                    note.updatedAt
                  ).toLocaleDateString()}

                </div>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
};

export default NotesSidebar;