import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Globe, Sparkles, FileText } from "lucide-react";

import { getPublicNote } from "../services/shareService";

const PublicNotePage = () => {
  const { shareId } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getPublicNote(shareId);

        setNote(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [shareId]);

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm px-8 py-7 flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F3F0FF] flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-[#7C3AED] animate-pulse" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Loading Public Note
          </h3>

          <p className="text-sm text-gray-500">
            Please wait while we fetch the shared content.
          </p>
        </div>
      </div>
    );
  }

  // NOTE NOT FOUND
  if (!note) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center mb-5">
            <FileText className="w-8 h-8 text-red-500" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Note Not Found
          </h2>

          <p className="text-gray-500 leading-relaxed mb-6">
            This shared note may have been removed or the link is invalid.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Back to Workspace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC]">
      {/* TOP NAVBAR */}
      <div className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7C3AED] flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5 text-white" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Peblo Notes
              </h2>

              <p className="text-xs text-gray-500">
                Public collaborative workspace
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#DDD6FE] bg-[#F5F3FF]">
            <Globe size={15} className="text-[#7C3AED]" />

            <span className="text-xs font-medium text-[#6D28D9]">
              Public Note
            </span>
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* NOTE CARD */}
        <div className="bg-white border border-gray-200 rounded-[28px] shadow-sm overflow-hidden">
          {/* HEADER SECTION */}
          <div className="px-6 md:px-10 pt-8 md:pt-10 pb-6 border-b border-gray-100">
            {/* META */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5F3FF] border border-[#DDD6FE]">
                <Sparkles size={13} className="text-[#7C3AED]" />

                <span className="text-xs font-medium text-[#6D28D9]">
                  Shared from Peblo Workspace
                </span>
              </div>

              {note.updatedAt && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
                  <CalendarDays size={13} />

                  <span className="text-xs font-medium">
                    Updated{" "}
                    {new Date(note.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* TITLE */}
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight break-words">
              {note.title || "Untitled Note"}
            </h1>

            {/* TAGS */}
            {note.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="px-6 md:px-10 py-8 md:py-10">
            <div className="prose prose-gray max-w-none">
              <div className="whitespace-pre-wrap break-words text-[16px] md:text-[17px] leading-8 text-gray-700">
                {note.content || (
                  <span className="italic text-gray-400">
                    This note is empty.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#7C3AED]" />

            <span>Shared securely using Peblo AI Notes Workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicNotePage;
