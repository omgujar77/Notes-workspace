const generateId = () => {
  return Math.random()
    .toString(36)
    .substring(2, 10);
};

export default generateId;