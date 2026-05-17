import API from "../api/axios";

// TOGGLE PUBLIC/PRIVATE
export const togglePublic = async (
  noteId
) => {
  const response = await API.patch(
    `/shared/toggle/${noteId}`
  );

  return response.data;
};

// GET PUBLIC NOTE
export const getPublicNote = async (
  shareId
) => {
  const response = await API.get(
    `/shared/${shareId}`
  );

  return response.data;
};