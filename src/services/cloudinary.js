export const uploadImage = async (image) => {

  const formData = new FormData();

  formData.append("file", image);

  formData.append(
    "upload_preset",
    "naina_upload"
  );


  const response = await fetch(
    "https://api.cloudinary.com/v1_1/rtxa2tem/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );


  const data = await response.json();

  console.log("Cloudinary Response:", data);

  return data.secure_url;
};