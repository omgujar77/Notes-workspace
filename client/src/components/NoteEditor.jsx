import { useEffect, useState, useRef } from "react";
import API from "../services/noteService";
import TagInput from "./TagInput";
import AIResultPanel from "./AIResultPanel";
import { generateAISummary } from "../api/ai";
import { Save, Trash2, Brain, Globe, Copy, ArrowLeft } from "lucide-react";
import { togglePublic } from "../services/shareService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const NoteEditor = ({ selectedNote, setSelectedNote, notes, setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [saving, setSaving] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [shareId, setShareId] = useState("");
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const textareaRef = useRef(null);

  const firstLoadRef = useRef(true);

  // LOAD SELECTED NOTE
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");

      setContent(selectedNote.content || "");

      setTags(selectedNote.tags ? [...selectedNote.tags] : []);

      // SHARE DATA
      setIsPublic(selectedNote.isPublic || false);

      setShareId(selectedNote.shareId || "");
    }
  }, [selectedNote]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";

      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  useEffect(() => {
    if (!selectedNote) return;

    // prevent autosave on first load
    if (firstLoadRef.current) {
      firstLoadRef.current = false;

      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsAutoSaving(true);

        const payload = {
          title,
          content,
          tags,
        };

        const { data } = await API.put(`/${selectedNote._id}`, payload);

        const updatedNotes = notes.map((note) =>
          note._id === data._id ? data : note,
        );

        setNotes(updatedNotes);

        setSelectedNote(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsAutoSaving(false);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [title, content, tags]);

  // AUTO SAVE AFTER USER STOPS TYPING
  useEffect(() => {
    // DON'T RUN IF NO NOTE
    if (
      !selectedNote?._id ||
      (title === "" && content === "" && tags.length === 0)
    ) {
      return;
    }

    // CLEAR OLD TIMER
    clearTimeout(saveTimeout.current);

    // START NEW TIMER
    saveTimeout.current = setTimeout(() => {
      autoSaveNote();
    }, 1500); // 1.5 SECOND AFTER TYPING STOPS

    // CLEANUP
    return () => clearTimeout(saveTimeout.current);
  }, [title, content, tags]);

  const saveTimeout = useRef(null);

  const autoSaveNote = async () => {
    try {
      setSaving(true);

      const payload = {
        title,
        content,
        tags,
      };

      const { data } = await API.put(`/${selectedNote._id}`, payload);

      const updatedNotes = notes.map((note) =>
        note._id === data._id ? data : note,
      );

      setNotes(updatedNotes);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  // SAVE NOTE
  const saveNote = async () => {
    try {
      setSaving(true);

      const payload = {
        title: title || "",
        content: content || "",
        tags: Array.isArray(tags) ? [...tags] : [],
      };

      const { data } = await API.put(`/${selectedNote._id}`, payload);

      const updatedNotes = notes.map((note) =>
        note._id === data._id ? data : note,
      );

      setNotes(updatedNotes);

      setSelectedNote(data);

      toast.success("Note saved");
    } catch (error) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateSummary = async () => {
    try {
      setLoadingAI(true);

      setAiError("");

      const result = await generateAISummary(selectedNote._id);

      setAiResult(result);
    } catch (error) {
      setAiError("Failed to generate AI summary");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleTogglePublic = async () => {
    try {
      const data = await togglePublic(selectedNote._id);

      setIsPublic(data.isPublic);

      setShareId(data.shareId);

      // update selected note locally
      setSelectedNote({
        ...selectedNote,
        isPublic: data.isPublic,
        shareId: data.shareId,
      });

      toast.success(
        data.isPublic ? "Note is now public" : "Note is now private",
      );
    } catch (error) {
      toast.error("Failed to update visibility");
    }
  };

  const handleCopyLink = async () => {
    if (!shareId) {
      toast.error("No share link found");
      return;
    }

    try {
      const url = `${window.location.origin}/shared/${shareId}`;

      await navigator.clipboard.writeText(url);

      toast.success("Share link copied!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  // DELETE NOTE
  const deleteNote = async () => {
    const confirmDelete = window.confirm("Delete this note?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/${selectedNote._id}`);

      const updatedNotes = notes.filter(
        (note) => note._id !== selectedNote._id,
      );

      setNotes(updatedNotes);

      setSelectedNote(updatedNotes[0] || null);

      toast.success("Note deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (!selectedNote) {
    return <div className="p-6 text-gray-500">Select a note</div>;
  }

  return (
    <div className="p-4 md:p-6 overflow-y-auto">
      {/* TOP NAVIGATION */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/">
          <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-xl transition text-sm font-medium">
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        </Link>

        <p className="text-sm text-gray-500">AI Notes Workspace</p>
      </div>
      {/* TOP BAR */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">
        <p className="text-sm text-gray-500 font-medium">
          {saving
            ? "Saving..."
            : isAutoSaving
              ? "Auto-saving..."
              : "All changes saved"}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={saveNote}
            disabled={saving}
            className={`px-3 py-2 text-sm rounded-lg rounded flex items-center gap-2 text-white ${
              saving
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <Save size={18} />

            {saving ? "Auto Saving..." : "saved"}
          </button>

          <button
            onClick={handleGenerateSummary}
            disabled={loadingAI}
            className="min-w-[190px] justify-center bg-black hover:bg-gray-800 text-white px-3 py-2 text-sm rounded-lg flex items-center gap-2 transition"
          >
            <Brain size={18} />

            {loadingAI ? "Generating..." : "Generate AI Summary"}
          </button>

          <button
            onClick={handleTogglePublic}
            className={`px-3 py-2 text-sm rounded-lg rounded flex items-center gap-2 text-white ${
              isPublic
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            <Globe size={18} />

            {isPublic ? "Make Private" : "Make Public"}
          </button>

          {isPublic && (
            <button
              onClick={handleCopyLink}
              className="bg-gray-800 hover:bg-black text-white px-3 py-2 text-sm rounded-lg rounded flex items-center gap-2"
            >
              <Copy size={18} />
              Copy Link
            </button>
          )}
          {aiError && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
              {aiError}
            </div>
          )}

          {loadingAI && (
            <div className="mt-4 bg-purple-50 border border-purple-200 text-purple-700 p-4 rounded-xl">
              AI is analyzing your note...
            </div>
          )}

          <button
            onClick={deleteNote}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-sm rounded-lg rounded flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* TITLE */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title..."
        className="w-full text-4xl font-bold mb-4 outline-none"
      />

      {/* TAG INPUT */}
      <TagInput
        tags={tags}
        setTags={(updatedTags) => {
          setTags(updatedTags);
        }}
      />

      {/* CONTENT */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="w-full min-h-[180px] max-h-none border border-gray-300 rounded-xl mt-4 p-4 outline-none resize-none text-gray-700 leading-7 focus:ring-2 focus:ring-black"
      />

      <div className="mt-6">
        <AIResultPanel
          aiResult={aiResult}
          onUseTitle={(newTitle) => {
            setTitle(newTitle);

            setSelectedNote({
              ...selectedNote,
              title: newTitle,
            });

            toast.success("Suggested title applied");
          }}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
