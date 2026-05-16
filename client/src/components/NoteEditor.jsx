import { useEffect, useState } from "react";
import API from "../services/noteService";
import TagInput from "./TagInput";
// import AIResultPanel from "./AIResultPanel";
import { generateAISummary } from "../api/ai";
import { Save, Trash2, Brain, Globe,Copy, Search } from "lucide-react";
import { togglePublic } from "../services/shareService";
import toast from "react-hot-toast";

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

  // LOAD SELECTED NOTE
  useEffect(() => {
  if (selectedNote) {

    setTitle(selectedNote.title || "");

    setContent(selectedNote.content || "");

    setTags(
      selectedNote.tags
        ? [...selectedNote.tags]
        : []
    );

    // SHARE DATA
    setIsPublic(
      selectedNote.isPublic || false
    );

    setShareId(
      selectedNote.shareId || ""
    );
  }
}, [selectedNote]);

  // SAVE NOTE
  const saveNote = async () => {
    try {
      setSaving(true);

      const payload = {
        title: title || "",
        content: content || "",
        tags: Array.isArray(tags) ? [...tags] : [],
      };
      console.log("CURRENT TAGS:", tags);

      const { data } = await API.put(`/${selectedNote._id}`, payload);

      // UPDATE NOTES
      const updatedNotes = notes.map((note) =>
        note._id === data._id ? data : note,
      );

      setNotes(updatedNotes);

      setSelectedNote(data);

      console.log("Note Saved");
    } catch (error) {
      console.log(error);

      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateSummary = async () => {
  try {
    setLoadingAI(true);

    setAiError("");

    const result = await generateAISummary(
      selectedNote._id
    );

    setAiResult(result);

  } catch (error) {
    console.log(error);

    setAiError("Failed to generate AI summary");

  } finally {
    setLoadingAI(false);
  }
};

const handleTogglePublic = async () => {
  try {

    const data = await togglePublic(
      selectedNote._id
    );

    setIsPublic(data.isPublic);

    setShareId(data.shareId);

    // update selected note locally
    setSelectedNote({
      ...selectedNote,
      isPublic: data.isPublic,
      shareId: data.shareId,
    });

    toast.success(
      data.isPublic
        ? "Note is now public"
        : "Note is now private"
    );

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed to update visibility"
    );
  }
};

const handleCopyLink = async () => {

  if (!shareId) {
    toast.error("No share link found");
    return;
  }

  try {

    const url =
      `${window.location.origin}/shared/${shareId}`;

    await navigator.clipboard.writeText(url);

    toast.success(
      "Share link copied!"
    );

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed to copy link"
    );
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
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedNote) {
    return <div className="p-6 text-gray-500">Select a note</div>;
  }

  return (
    <div className="p-6">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          {saving ? "Saving..." : "Ready"}
        </p>

        <div className="flex gap-3">
          <button
  onClick={saveNote}
  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
>
  <Save size={18} />
  Save
</button>

          <button
  onClick={handleGenerateSummary}
  disabled={loadingAI}
  className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
>
  <Brain size={18} />

  {loadingAI
    ? "Generating..."
    : "Generate AI Summary"}
</button>

<button
  onClick={handleTogglePublic}
  className={`px-4 py-2 rounded flex items-center gap-2 text-white ${
    isPublic
      ? "bg-orange-500 hover:bg-orange-600"
      : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  <Globe size={18} />

  {isPublic
    ? "Make Private"
    : "Make Public"}
</button>

{isPublic && (
  <button
    onClick={handleCopyLink}
    className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded flex items-center gap-2"
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
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
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
          console.log(updatedTags);

          setTags(updatedTags);
        }}
      />

      {/* CONTENT */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="w-full h-[70vh] border rounded mt-4 p-4 outline-none"
      />

{/* AI RESULT PANEL */}
{aiResult && (
  <div className="mt-8 border rounded-2xl p-6 bg-white shadow-md">

    <h2 className="text-2xl font-bold mb-6">
      AI Insights
    </h2>

    {/* SUMMARY */}
    <div className="mb-6">

      <h3 className="font-semibold text-lg mb-2">
        Summary
      </h3>

      <p className="text-gray-700 leading-7">
        {aiResult.summary}
      </p>

    </div>

    {/* ACTION ITEMS */}
    <div className="mb-6">

      <h3 className="font-semibold text-lg mb-2">
        Action Items
      </h3>

      <ul className="list-disc ml-6 space-y-2">

        {aiResult.action_items?.map(
          (item, index) => (
            <li key={index}>
              {item}
            </li>
          )
        )}

      </ul>

    </div>

    {/* SUGGESTED TITLE */}
    <div>

      <h3 className="font-semibold text-lg mb-2">
        Suggested Title
      </h3>

      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl">

        <p className="font-medium">
          {aiResult.suggested_title}
        </p>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => {

            setTitle(
              aiResult.suggested_title
            );

            setSelectedNote({
              ...selectedNote,
              title:
                aiResult.suggested_title,
            });
          }}
        >
          Use This Title
        </button>

      </div>

    </div>

  </div>
)}

    </div>

    
  );
};

export default NoteEditor;
