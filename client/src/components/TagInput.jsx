// src/components/TagInput.jsx

import { useState } from "react";
import { X, Plus } from "lucide-react";

const TagInput = ({ tags = [], setTags }) => {
  const [input, setInput] = useState("");

  // ADD TAG FUNCTION
  const handleAddTag = () => {
    const trimmed = input.trim().replace(",", "");

    // EMPTY CHECK
    if (!trimmed) return;

    // PREVENT DUPLICATES
    if (tags.includes(trimmed)) {
      setInput("");
      return;
    }

    // ADD TAG
    setTags([...tags, trimmed]);

    // CLEAR INPUT
    setInput("");
  };

  // ENTER OR COMMA SUPPORT
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  // REMOVE TAG
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mb-4">
      {/* TAG LIST */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              <span>#{tag}</span>

              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-purple-500 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* INPUT + BUTTON */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add tag and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          enterKeyHint="done"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all"
        />

        <button
          type="button"
          onClick={handleAddTag}
          className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
    </div>
  );
};

export default TagInput;