const AIResultPanel = ({
  aiResult,
  onUseTitle,
}) => {

  if (!aiResult) return null;

  return (
    <div className="mt-4 bg-white border rounded-xl p-4 shadow-sm">

      <h2 className="text-xl font-semibold mb-4">
        AI Insights
      </h2>

      {/* Summary */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">
          Summary
        </h3>

        <p className="text-gray-700">
          {aiResult.summary}
        </p>
      </div>

      {/* Action Items */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">
          Action Items
        </h3>

        <ul className="list-disc ml-5 text-gray-700">
          {aiResult.action_items?.map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
      </div>

      {/* Suggested Title */}
      <div>

        <h3 className="font-semibold mb-1">
          Suggested Title
        </h3>

        <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg">

          <span>
            {aiResult.suggested_title}
          </span>

          <button
            onClick={() =>
              onUseTitle(
                aiResult.suggested_title
              )
            }
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
          >
            Use This
          </button>

        </div>

      </div>

    </div>
  );
};

export default AIResultPanel;