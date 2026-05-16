import { useState } from "react";

const TagInput = ({ tags = [], setTags }) => {

  const [input, setInput] = useState("");

  // ADD TAG
  const addTag = (e) => {

    if (e.key === "Enter") {

      e.preventDefault();

      const trimmed = input.trim();

      if (!trimmed) return;

      // PREVENT DUPLICATES
      if (tags.includes(trimmed)) {

        setInput("");

        return;
      }

      // UPDATE TAGS STATE
      const updatedTags = [...tags, trimmed];

      setTags(updatedTags);

      setInput("");
    }
  };

  // REMOVE TAG
  const removeTag = (tagToRemove) => {

    const updatedTags = tags.filter(
      (tag) => tag !== tagToRemove
    );

    setTags(updatedTags);
  };

  return (
    <div className="border p-3 rounded">

      <div className="flex flex-wrap gap-2 mb-2">

        {tags.map((tag, index) => (

          <div
            key={index}
            className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-2"
          >

            <span>{tag}</span>

            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-red-500"
            >
              ×
            </button>

          </div>
        ))}

      </div>

      <input
        type="text"
       placeholder="Type tag and press Enter"
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        onKeyDown={addTag}
        className="w-full outline-none"
      />

    </div>
  );
};

export default TagInput;