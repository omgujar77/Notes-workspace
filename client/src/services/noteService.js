import API from "../api/axios";

// GET NOTES
export const getNotes = async (archived = false) => {
  const response = await API.get(
    `/notes?archived=${archived}`
  );

  return response.data;
};

// CREATE NOTE
export const createNote = async (noteData) => {
  const response = await API.post(
    "/notes",
    noteData
  );

  return response.data;
};

// UPDATE NOTE
export const updateNote = async (
  noteId,
  noteData
) => {
  const response = await API.put(
    `/notes/${noteId}`,
    noteData
  );

  return response.data;
};

// DELETE NOTE
export const deleteNote = async (noteId) => {
  const response = await API.delete(
    `/notes/${noteId}`
  );

  return response.data;
};

// ARCHIVE NOTE
export const archiveNote = async (noteId) => {
  const response = await API.patch(
    `/notes/archive/${noteId}`
  );

  return response.data;
};

// RESTORE NOTE
export const restoreNote = async (noteId) => {
  const response = await API.patch(
    `/notes/restore/${noteId}`
  );

  return response.data;
};