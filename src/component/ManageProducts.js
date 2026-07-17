import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
fetch("https://naina-artistry-backend.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

const navigate = useNavigate();
const deleteProduct = (id) => {
fetch(`https://naina-artistry-backend.onrender.com/products/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    })
    .catch((err) => console.log(err));
};

const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div style={{ padding: "30px" }}>
      <h2>Manage Products</h2>


    {/* Search Box */}
    <input
      type="text"
      placeholder="🔍 Search Product..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "300px",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px",
      }}
    />

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
           <th>Price</th>
           <th>Stock</th>
           <th>Action</th>

          </tr>
        </thead>

<tbody>
  {filteredProducts.map((product) => (
    <tr key={product.id}>
      <td>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
          }}
        />
      </td>

      <td>{product.name}</td>

      <td>{product.category}</td>

      <td>₹{product.price}</td>

      <td>
        {product.stock > 0 ? (
          <span style={{ color: "green", fontWeight: "bold" }}>
            {product.stock} Available
          </span>
        ) : (
          <span style={{ color: "red", fontWeight: "bold" }}>
            Out of Stock
          </span>
        )}
      </td>

      <td>
        <button
          onClick={() => navigate(`/edit-product/${product.id}`)}
          style={{
            background: "green",
            color: "white",
            border: "none",
            padding: "8px 12px",
            marginRight: "10px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Edit
        </button>

        <button
          onClick={() => deleteProduct(product.id)}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>


      </table>
    </div>
  );
}

export default ManageProducts;