const fileToURL = (file) => {
  if (file && typeof file !== "string") {
    const objectURL = URL.createObjectURL(file);
    return objectURL;
  }
  return;
};

function base64ToFile(base64String, filename) {
  if (
    base64String !== undefined &&
    base64String !== null &&
    base64String !== ""
  ) {
    const base64Prefix = "data:image/png;base64,";
    const base64 = base64String.replace(base64Prefix, "");

    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "image/png" });
    const file = new File([blob], filename, { type: "image/png" });
    return file;
  }
  return;
}

export { fileToURL, base64ToFile };
