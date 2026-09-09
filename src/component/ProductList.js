import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

function ProductList({
  products,
  addToCart,
  category,
  search,
  priceFilter,
  sortBy,
  wishlistItems,
  toggleWishlist,
  cartItems,
}) {
  const navigate = useNavigate();

  // Category Filter
  let filteredProducts = category
    ? products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === category.toLowerCase()
      )
    : [...products];

  // Search Filter
  if (search && search.trim() !== "") {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Price Filter
  if (priceFilter === "under20000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price < 20000
    );
  } else if (priceFilter === "20000to50000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= 20000 && p.price <= 50000
    );
  } else if (priceFilter === "50000to100000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price > 50000 && p.price <= 100000
    );
  } else if (priceFilter === "above100000") {
    filteredProducts = filteredProducts.filter(
      (p) => p.price > 100000
    );
  }

  // Sort Products
  let finalProducts = [...filteredProducts];

  if (sortBy === "lowToHigh") {
    finalProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "highToLow") {
    finalProducts.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "latest") {
    finalProducts.sort((a, b) => b.id - a.id);
  }

  return (
    <div className="products-section" id="products">
      <h2 className="section-title">
        {category
          ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`
          : "Jewellery Collection"}
      </h2>

      <div className="grid">
        {finalProducts.length > 0 ? (
          finalProducts.map((product) => {

            // Find product in cart
           const cartItem = (cartItems || []).find(
             (item) => item.id === product.id
           );

            // Quantity already added to cart
            const cartQuantity = cartItem
              ? cartItem.quantity
              : 0;

            // Remaining stock
            const remainingStock =
              Number(product.stock) - cartQuantity;

            return (
              <div
                className="card"
                key={product.id}
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
              >
                <div className="image-container">

                  {/* Wishlist */}
                  <div
                    className="wishlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                  >
                    {(wishlistItems || []).some(
                      (item) => item.id === product.id
                    )
                      ? "❤️"
                      : "🤍"}
                  </div>

                  {/* Product Image */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                  />
                </div>

                <div className="card-body">

                  <h3>{product.name}</h3>

                  <p>{product.description}</p>

                  <h2>
                    ₹{product.price.toLocaleString()}
                  </h2>

                  {/* Stock Check */}
                  {remainingStock <= 0 ? (
                    <button
                      className="stock-btn"
                      disabled
                    >
                      Out of Stock
                    </button>
                  ) : (
                    <button
                      className="cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  )}

                </div>
              </div>
            );
          })
        ) : (
          <h3 className="no-products">
            No products found.
          </h3>
        )}
      </div>
    </div>
  );
}

export default ProductList;