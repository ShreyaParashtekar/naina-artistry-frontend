import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/products`)
      .then((res) => res.json())
      .then((data) => {
        const selectedProduct = data.find(
          (p) => p.id === parseInt(id)
        );

        if (selectedProduct) {
          setProduct(selectedProduct);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = () => {
    fetch(`http://localhost:8080/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product updated successfully!");
        navigate("/manage-products");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
      <h2>Edit Product</h2>

      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
        style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
      />

      <input
        type="text"
        name="imageUrl"
        value={product.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        style={{ width: "100%", marginBottom: "20px", padding: "10px" }}
      />

    <button
      onClick={updateProduct}
      style={{
        background: "green",
        color: "white",
        padding: "10px 20px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Update Product
    </button>

      <button
        onClick={() => navigate("/manage-products")}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditProduct;