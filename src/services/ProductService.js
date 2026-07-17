const API_URL = "http://localhost:8080/products";

export const getProducts = async () => {
  const response = await fetch(API_URL);
  return response.json();


};

export const deleteProduct = async (id) => {
  await fetch(`http://localhost:8080/products/${id}`, {
    method: "DELETE"
  });
};