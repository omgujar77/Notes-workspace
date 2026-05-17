import { useEffect, useState, useRef } from "react";
import {
  updateNote as updateNoteService,
  deleteNote as deleteNoteService,
} from "../services/noteService";
import TagInput from "./TagInput";
import AIResultPanel from "./AIResultPanel";
import { generateAISummary } from "../services/aiService";

import {
  Save,
  Trash2,
  Brain,
  Globe,
  Copy,
  ArrowLeft,
  Sparkles,
  Check,
  Loader2,
  Lock,
  FileText,
  Clock3,
  Share2,
  ShieldCheck,
} from "lucide-react";

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

  const [showSaveCheck, setShowSaveCheck] = useState(false);

  const textareaRef = useRef(null);

  const firstLoadRef = useRef(true);

  // LOAD NOTE
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");

      setContent(selectedNote.content || "");

      setTags(selectedNote.tags ? [...selectedNote.tags] : []);

      setIsPublic(selectedNote.isPublic || false);

      setShareId(selectedNote.shareId || "");
    }
  }, [selectedNote]);

  // AUTO RESIZE
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";

      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  // AUTO SAVE
  useEffect(() => {
    if (!selectedNote) return;

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

        const data = await updateNoteService(selectedNote._id, payload);

        const updatedNotes = notes.map((note) =>
          note._id === data._id ? data : note,
        );

        setNotes(updatedNotes);

        setSelectedNote(data);

        setShowSaveCheck(true);

        setTimeout(() => {
          setShowSaveCheck(false);
        }, 1800);
      } catch (error) {
        console.log(error);

        toast.error("Auto-save failed");
      } finally {
        setIsAutoSaving(false);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [title, content, tags]);

  // SAVE NOTE
  const saveNote = async () => {
    try {
      setSaving(true);

      const payload = {
        title: title || "",
        content: content || "",
        tags: Array.isArray(tags) ? [...tags] : [],
      };

      const data = await updateNoteService(selectedNote._id, payload);

      const updatedNotes = notes.map((note) =>
        note._id === data._id ? data : note,
      );

      setNotes(updatedNotes);

      setSelectedNote(data);

      toast.success("Note saved successfully");
    } catch (error) {
      toast.error("Failed to save note");
    } finally {
      setSaving(false);
    }
  };

  // AI SUMMARY
  const handleGenerateSummary = async () => {
    try {
      setLoadingAI(true);

      setAiError("");

      const result = await generateAISummary(selectedNote._id);

      setAiResult(result);

      toast.success("AI summary generated");
    } catch (error) {
      setAiError("Failed to generate AI summary");

      toast.error("AI generation failed");
    } finally {
      setLoadingAI(false);
    }
  };

  // PUBLIC TOGGLE
  const handleTogglePublic = async () => {
    try {
      const data = await togglePublic(selectedNote._id);

      setIsPublic(data.isPublic);

      setShareId(data.shareId);

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

  // COPY LINK
  const handleCopyLink = async () => {
    if (!shareId) {
      toast.error("No share link available");

      return;
    }

    try {
      const url = `${window.location.origin}/shared/${shareId}`;

      await navigator.clipboard.writeText(url);

      toast.success("Share link copied");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  // DELETE NOTE
  const deleteNote = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmDelete) return;

    try {
      await deleteNoteService(selectedNote._id);

      const updatedNotes = notes.filter(
        (note) => note._id !== selectedNote._id,
      );

      setNotes(updatedNotes);

      setSelectedNote(updatedNotes[0] || null);

      toast.success("Note deleted");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  // EMPTY STATE
  if (!selectedNote) {
    return (
      <div className="h-full bg-[#F8FAFC] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-3xl bg-violet-100 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-violet-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            No note selected
          </h2>

          <p className="text-gray-500 leading-relaxed">
            Choose a note from your workspace or create a new one to start
            writing.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#F8FAFC] overflow-hidden flex flex-col">
      {/* TOP HEADER */}
      <div className="border-b border-gray-200 bg-white px-4 md:px-8 py-4 sticky top-0 z-30">
        <div className="flex flex-col gap-4">
          {/* TOP ROW */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link to="/">
                <button className="w-11 h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition flex items-center justify-center">
                  <ArrowLeft className="text-gray-700" size={18} />
                </button>
              </Link>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Peblo Notes Workspace
                </h2>

                <p className="text-sm text-gray-500">
                  AI-powered collaborative editor
                </p>
              </div>
            </div>

            {/* SAVE STATUS */}
            <div className="hidden md:flex items-center gap-2">
              {showSaveCheck ? (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full">
                  <Check size={16} />
                  <span className="text-sm font-medium">Saved</span>
                </div>
              ) : isAutoSaving ? (
                <div className="flex items-center gap-2 text-violet-600 bg-violet-50 border border-violet-100 px-4 py-2 rounded-full">
                  <Loader2 size={16} className="animate-spin" />

                  <span className="text-sm font-medium">Auto-saving</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-500 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full">
                  <Clock3 size={16} />

                  <span className="text-sm font-medium">
                    All changes synced
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap items-center gap-3">
            {/* SAVE */}
            <button
              onClick={saveNote}
              disabled={saving}
              className={`h-11 px-5 rounded-xl font-medium transition flex items-center gap-2 ${
                saving
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
              }`}
            >
              {saving ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}

              {saving ? "Saving..." : "Save"}
            </button>

            {/* AI */}
            <button
              onClick={handleGenerateSummary}
              disabled={loadingAI}
              className={`h-11 px-5 rounded-xl font-medium transition flex items-center gap-2 ${
                loadingAI
                  ? "bg-violet-300 cursor-wait text-white"
                  : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-sm"
              }`}
            >
              {loadingAI ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Brain size={17} />
              )}

              {loadingAI ? "Generating..." : "AI Summary"}
            </button>

            {/* PUBLIC */}
            <button
              onClick={handleTogglePublic}
              className={`h-11 px-5 rounded-xl font-medium transition flex items-center gap-2 shadow-sm ${
                isPublic
                  ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              {isPublic ? (
                <>
                  <Lock size={17} />
                  Private
                </>
              ) : (
                <>
                  <Globe size={17} />
                  Public
                </>
              )}
            </button>

            {/* SHARE */}
            {isPublic && (
              <button
                onClick={handleCopyLink}
                className="h-11 px-5 rounded-xl bg-gray-900 hover:bg-black text-white font-medium transition flex items-center gap-2 shadow-sm"
              >
                <Share2 size={17} />
                Copy Link
              </button>
            )}

            {/* DELETE */}
            <button
              onClick={deleteNote}
              className="h-11 px-5 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 font-medium transition flex items-center gap-2"
            >
              <Trash2 size={17} />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        {/* AI STATUS */}
        {aiError && (
          <div className="mb-5 bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />

              <p className="text-sm font-medium text-red-700">{aiError}</p>
            </div>
          </div>
        )}

        {loadingAI && (
          <div className="mb-5 bg-violet-50 border border-violet-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Brain className="text-violet-600 animate-pulse" size={20} />

              <p className="text-sm font-medium text-violet-700">
                AI is analyzing your note and generating insights...
              </p>
            </div>
          </div>
        )}

        {/* EDITOR CARD */}
        <div className="bg-white border border-gray-200 rounded-[28px] shadow-sm overflow-hidden">
          {/* TOP SECTION */}
          <div className="px-6 md:px-10 pt-8 md:pt-10">
            {/* TITLE */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled note"
              className="w-full bg-transparent text-[34px] md:text-[46px] leading-tight tracking-[-0.03em] font-semibold text-gray-900 placeholder:text-gray-300 outline-none"
            />

            {/* META */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ShieldCheck size={16} />

                <span>Secure collaborative workspace</span>
              </div>

              {isPublic && (
                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  <Globe size={14} />

                  <span>Publicly shared</span>
                </div>
              )}
            </div>

            {/* TAGS */}
            <div className="mt-6">
              <TagInput
                tags={tags}
                setTags={(updatedTags) => {
                  setTags(updatedTags);
                }}
              />
            </div>
          </div>

          {/* TEXTAREA */}
          <div className="px-6 md:px-10 py-8">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your thoughts, meeting notes, ideas, or learning summaries..."
                className="w-full min-h-[420px] bg-transparent resize-none outline-none text-[17px] leading-8 text-gray-700 placeholder:text-gray-400"
              />

              <div className="sticky bottom-4 flex justify-end pointer-events-none">
                <div className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg">
                  {content.length} characters
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI RESULT */}
        {aiResult && (
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
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
