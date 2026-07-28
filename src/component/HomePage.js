import React from "react";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import StickyNavbar from "./StickyNavbar";
import ProductList from "./ProductList";
import { ClipLoader } from "react-spinners";

function HomePage({
  loading,
  products,
  addToCart,
  search,
  setSearch,
  priceFilter,
  setPriceFilter,
  sortBy,
  setSortBy,
  wishlistItems,
  toggleWishlist,
}) {

  const location = useLocation();
  const showStickyNavbar = location.pathname === "/home";

  if (loading) {
    return (
      <div
        style={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <ClipLoader color="#c89b3c" size={60} />

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
            color: "#555",
            fontWeight: "500",
          }}
        >
          Preparing our jewellery collection...
        </p>
      </div>
    );
  }

  return (
    <>


      <Hero />

      <ProductList
        products={products}
        addToCart={addToCart}
        search={search}
        priceFilter={priceFilter}
        sortBy={sortBy}
        wishlistItems={wishlistItems}
        toggleWishlist={toggleWishlist}
      />
    </>
  );
}

export default HomePage;