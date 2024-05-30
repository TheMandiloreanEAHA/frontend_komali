const fileToURL = (file) => {
  if (file && typeof file !== "string") {
    const objectURL = URL.createObjectURL(file);
    return objectURL;
  }
  return;
};

function base64ToFile(base64String, filename) {
  // Remove the data URL prefix (if any)
  const base64Prefix = "data:image/png;base64,";
  const base64 = base64String.replace(base64Prefix, "");

  // Decode the base64 string to binary data
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob object from the binary data
  const blob = new Blob([bytes], { type: "image/png" });

  // Create a File object from the Blob
  const file = new File([blob], filename, { type: "image/png" });

  return file;
}

export { fileToURL, base64ToFile };
