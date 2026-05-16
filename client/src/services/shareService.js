import api from "../api/axios";


// toggle public/private
export const togglePublic = async (noteId) => {
  const response = await api.patch(
    `/shared/toggle/${noteId}`
  );

  return response.data;
};


// get public note
export const getPublicNote = async (shareId) => {
  const response = await api.get(
    `/shared/${shareId}`
  );

  return response.data;
};