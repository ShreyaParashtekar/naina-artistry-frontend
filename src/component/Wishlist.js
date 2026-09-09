import React from "react";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

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

  const handleAddToCart = (item) => {
    addToCart(item);

    setWishlistItems(
      wishlistItems.filter((p) => p.id !== item.id)
    );

    alert("Added to Cart 🛒");
  };

  return (
    <div className="wishlist-page">

      <h2 className="wishlist-title">❤️ My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <h3 className="empty-wishlist">
          Your wishlist is empty.
        </h3>
      ) : (
        <div className="wishlist-list">

          {wishlistItems.map((item) => (
            <div className="wishlist-card" key={item.id}>

              {/* PRODUCT IMAGE */}
              <img
                className="wishlist-image"
                src={item.imageUrl}
                alt={item.name}
              />

              {/* PRODUCT DETAILS */}
              <div className="wishlist-details">

                <h3
                  className="wishlist-product-name"
                  onClick={() =>
                    navigate(`/product/${item.id}`)
                  }
                >
                  {item.name}
                </h3>

                <p className="wishlist-description">
                  {item.description}
                </p>

                <h3 className="wishlist-price">
                  ₹{item.price}
                </h3>

              </div>

              {/* ACTION BUTTONS */}
              <div className="wishlist-actions">

                <button
                  className="wishlist-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>

                <button
                  className="wishlist-remove-btn"
                  onClick={() =>
                    removeFromWishlist(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;