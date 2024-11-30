import { saveAs } from "file-saver";

// Function to convert Blob to string
export const blobToString = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result); // This will return the Blob as a string
    };
    reader.onerror = reject; // Handle any errors
    reader.readAsText(blob); // Read the blob as text
  });
};

export const stringToBlob = (str, type = 'text/plain') => {
  return new Blob([str], { type });
};

export const fileDownload = (file, fileName, mimeType) => {
  if (file instanceof Blob) {
    saveAs(file, fileName);
    return;
  }

  const binaryString = window.atob(file);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);

  for (let i = 0; i < binaryLen; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: mimeType });
  saveAs(blob, fileName);
};

export const blobToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]); // Resolve with the base64 string
    reader.onerror = (error) => reject(error); // Reject in case of an error
    reader.readAsDataURL(file); // Read the file
  });
};

export const base64ToImgSrc = (base64 = '') => {
  return `data:image/png;base64,${base64}`
}

export const blobToImgSrc = (image) => {
  if (!image) return;

  if (image instanceof Blob) {
    const objectUrl = URL.createObjectURL(image);
    return objectUrl;
  };

  return base64ToImgSrc(image);
}

export const getFileFormData = (files, name = 'attachments') => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append(name, file?.fileContent);
  });
  return formData;
}