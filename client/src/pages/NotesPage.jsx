import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import NotesSidebar from "../components/NotesSidebar";

import NoteEditor from "../components/NoteEditor";

import API from "../services/noteService";

const NotesPage = () => {

  const [notes, setNotes] =
    useState([]);

  const [
    selectedNote,
    setSelectedNote,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [
    showArchived,
    setShowArchived,
  ] = useState(false);

  useEffect(() => {

    fetchNotes(showArchived);

  }, [showArchived]);

  // FETCH NOTES
  const fetchNotes = async (
    archived = false
  ) => {

    try {

      setLoading(true);

      const { data } =
        await API.get(
          archived
            ? "/?archived=true"
            : "/"
        );

      setNotes(data);

      if (data.length > 0) {

        setSelectedNote(data[0]);

      } else {

        setSelectedNote(null);
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch notes"
      );

    } finally {

      setLoading(false);
    }
  };

  // LOADING
  if (loading) {

    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">

        <p className="text-gray-500 font-medium">

          Loading notes...

        </p>

      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-50">

      {/* SIDEBAR */}
      <div className="w-full md:w-[350px] border-r bg-white overflow-y-auto">

        <NotesSidebar
          notes={notes}
          setNotes={setNotes}
          selectedNote={selectedNote}
          setSelectedNote={
            setSelectedNote
          }
          fetchNotes={fetchNotes}
          showArchived={
            showArchived
          }
          setShowArchived={
            setShowArchived
          }
        />

      </div>

      {/* EDITOR */}
      <div className="flex-1 overflow-y-auto">

        {selectedNote ? (

          <NoteEditor
            selectedNote={
              selectedNote
            }
            setSelectedNote={
              setSelectedNote
            }
            notes={notes}
            setNotes={setNotes}
          />

        ) : (

          <div className="h-full flex items-center justify-center">

            <div className="text-center">

              <h2 className="text-2xl font-semibold text-gray-700 mb-2">

                No Note Selected

              </h2>

              <p className="text-gray-500">

                Create or select a note
                to start writing

              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default NotesPage;