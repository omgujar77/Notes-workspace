// src/components/TagInput.jsx

import { useState } from "react";
import { X } from "lucide-react";

const TagInput = ({ tags = [], setTags }) => {
  const [input, setInput] = useState("");

  // ADD TAG
  const addTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const trimmed = input.trim().replace(",", "");

      if (!trimmed) return;

      // PREVENT DUPLICATES
      if (tags.includes(trimmed)) {
        setInput("");
        return;
      }

      setTags([...tags, trimmed]);
      setInput("");
    }
  };

  // REMOVE TAG
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mb-4">
      {/* TAGS */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium"
            >
              <span>#{tag}</span>

              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* INPUT */}
      <input
        type="text"
        placeholder="Type tag and press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
      />
    </div>
  );
};

export default TagInput;