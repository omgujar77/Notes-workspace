import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  getPublicNote,
} from "../services/shareService";

const PublicNotePage = () => {

  const { shareId } = useParams();

  const [note, setNote] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchNote = async () => {

      try {

        const data =
          await getPublicNote(
            shareId
          );

        setNote(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchNote();

  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">

        Loading public note...

      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">

        Public note not found

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">

        <h1 className="text-4xl font-bold mb-6">
          {note.title}
        </h1>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-6">

          {note.tags?.map(
            (tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            )
          )}

        </div>

        {/* CONTENT */}
        <div className="whitespace-pre-wrap leading-8 text-gray-700">

          {note.content}

        </div>

      </div>

    </div>
  );
};

export default PublicNotePage;