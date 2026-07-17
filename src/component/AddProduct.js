import React, { useState } from "react";
import { uploadImage } from "../services/cloudinary";

function AddProduct({ onAdd }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [stock, setStock] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   try {

     if (!image) {
       alert("Please select an image");
       return;
     }

     // 1. Upload image to Cloudinary
     const imageUrl = await uploadImage(image);


     // 2. Create product object
     const newProduct = {
       name: product.name,
       description: product.description,
       price: Number(product.price),
       category: product.category,
       imageUrl: imageUrl,
       stock: Number(stock),
     };


     // 3. Save product in Spring Boot + MySQL
     await fetch(
       "https://naina-artistry-backend.onrender.com/products",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(newProduct),
       }
     );


     alert("Product Added Successfully 🎉");


     setProduct({
       name: "",
       description: "",
       price: "",
       category: "",
       imageUrl: "",
     });

     setImage(null);
     setStock("");

     onAdd();


   } catch (err) {
     console.log(err);
     alert("Failed to add product");
   }
 };

  const inputStyle = {
    width: "320px",
    height: "45px",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "420px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Add New Jewellery 💎
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={product.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          value={product.description}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={product.price}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={inputStyle}
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Category</option>
          <option value="gold">Gold</option>
          <option value="diamond">Diamond</option>
          <option value="earrings">Earrings</option>
          <option value="rings">Rings</option>
          <option value="anklet">Anklet</option>
          <option value="silver">Silver</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedImage = e.target.files[0];

            setImage(selectedImage);

            setProduct({
              ...product,
              imageUrl: URL.createObjectURL(selectedImage),
            });
          }}
          style={{
            ...inputStyle,
            padding: "8px",
          }}
        />

        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt="Preview"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
              marginTop: "15px",
            }}
          />
        )}

        <button
          onClick={handleSubmit}
          style={{
            marginTop: "25px",
            width: "200px",
            padding: "12px",
            background: "#ff4081",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Add Product ➕
        </button>
      </div>
    </div>
  );
}

export default AddProduct;