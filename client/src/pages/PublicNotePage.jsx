import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { getPublicNote } from "../services/shareService";

import { Globe } from "lucide-react";

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

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-md">
          <p className="text-gray-600 text-lg font-medium">
            Loading public note...
          </p>
        </div>
      </div>
    );
  }

  // NOTE NOT FOUND
  if (!note) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Note Not Found
          </h2>

          <p className="text-gray-500">This public note does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* TOP BAR */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Globe size={16} />
            Public Note
          </div>
        </div>

        {/* NOTE CARD */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 md:p-10">
          {/* TITLE */}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 mb-6 break-words">
            {note.title || "Untitled Note"}
          </h1>

          {/* TAGS */}
          {note.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CONTENT */}
          <div className="whitespace-pre-wrap break-words text-gray-700 leading-8 text-[16px] md:text-[17px]">
            {note.content || "Empty note"}
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Shared using AI Notes Workspace
        </div>
      </div>
    </div>
  );
};

export default PublicNotePage;
