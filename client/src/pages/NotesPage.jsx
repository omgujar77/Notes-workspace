import { useEffect, useState } from "react";
import NotesSidebar from "../components/NotesSidebar";
import NoteEditor from "../components/NoteEditor";
import API from "../services/noteService";

const NotesPage = () => {

  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {

    try {

      const { data } = await API.get("/");

      setNotes(data);

      if (data.length > 0) {
        setSelectedNote(data[0]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen">

      <div className="w-1/3 border-r">

        <NotesSidebar
          notes={notes}
          setNotes={setNotes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />

      </div>

      <div className="flex-1">

        <NoteEditor
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          notes={notes}
          setNotes={setNotes}
        />

      </div>

    </div>
  );
};

export default NotesPage;