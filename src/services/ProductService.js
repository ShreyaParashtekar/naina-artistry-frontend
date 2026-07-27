const API_URL = "https://naina-artistry-backend.onrender.com/products";
export const getProducts = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};