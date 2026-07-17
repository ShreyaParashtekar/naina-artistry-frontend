import React from "react";
import { useNavigate } from "react-router-dom";

function Wishlist({
  wishlistItems,
  setWishlistItems,
  addToCart,
}) {
  const navigate = useNavigate();

  const removeFromWishlist = (id) => {
    setWishlistItems(
      wishlistItems.filter((item) => item.id !== id)
    );
  };

  return (
    <div style={{ padding: "30px" }}>


      <h2>❤️ My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <h3>Your wishlist is empty.</h3>
      ) : (
        wishlistItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              background: "white",
              marginBottom: "20px",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
          >
           <img
             src={item.imageUrl}
             alt={item.name}
             style={{
               width: "120px",
               height: "120px",
               objectFit: "cover",
             }}
           />

            <div style={{ flex: 1 }}>
<h3
    onClick={() => navigate(`/product/${item.id}`)}
    style={{ cursor: "pointer" }}
>
    {item.name}
</h3>              <p>{item.description}</p>
              <h3>₹{item.price}</h3>
            </div>

            <button
onClick={() => {
  addToCart(item);

  setWishlistItems(
    wishlistItems.filter((p) => p.id !== item.id)
  );
    alert("Added to Cart 🛒");

}}              style={{
                background: "#ff4081",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              Add to Cart
            </button>

            <button
              onClick={() => removeFromWishlist(item.id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;