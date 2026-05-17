import API from "../api/axios";

export const generateAISummary = async (noteId) => {
  const response = await API.post(
    `/ai/summarize/${noteId}`
  );

  return response.data;
};