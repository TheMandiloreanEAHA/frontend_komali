const fileToURL = (file) => {
  if (file) {
    const objectURL = URL.createObjectURL(file);
    return objectURL;
  }
  return;
};

export { fileToURL };
