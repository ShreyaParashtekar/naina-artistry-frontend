import React from "react";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import StickyNavbar from "./StickyNavbar";
import ProductList from "./ProductList";

function HomePage({
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