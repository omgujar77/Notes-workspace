import { useState } from "react";
import API from "../services/noteService";

const NotesSidebar = ({
  notes,
  setNotes,
  selectedNote,
  setSelectedNote,
}) => {

  const [search, setSearch] = useState("");

 const createNote = async () => {

  try {

    const newNote = {
      title: "",
      content: "",
      tags: [],
    };

    const { data } = await API.post(
      "/",
      newNote
    );

    setNotes((prev) => [data, ...prev]);

    // FORCE CLEAN NOTE
    setSelectedNote({
      ...data,
      tags: [],
    });

  } catch (error) {

    console.log(error);
  }
};

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">

      <button
        onClick={createNote}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        New Note
      </button>

      <input
        type="text"
        placeholder="Search notes..."
        className="w-full border p-2 mt-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="mt-4">

        {filteredNotes.map((note) => (

          <div
            key={note._id}
            onClick={() => setSelectedNote(note)}
            className={`p-3 border mb-2 cursor-pointer ${
              selectedNote?._id === note._id
                ? "bg-gray-200"
                : ""
            }`}
          >
            <h2 className="font-bold">
              {note.title}
            </h2>

            <p className="text-sm">
              {note.content.slice(0, 50)}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default NotesSidebar;