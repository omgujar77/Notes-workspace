import axiosInstance from "./axios";

export const generateAISummary = async (noteId) => {
  const response = await axiosInstance.post(
    `/ai/summarize/${noteId}`
  );

  return response.data;
};