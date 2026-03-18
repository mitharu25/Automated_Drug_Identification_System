export const detectDrug = async (imageBlob) => {
  const formData = new FormData();
  formData.append("file", imageBlob);

  const response = await fetch("http://127.0.0.1:8000/detect-stream", {
    method: "POST",
    body: formData
  });

  return response.json();
};