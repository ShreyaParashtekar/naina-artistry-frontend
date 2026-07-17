import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({
  isLoggedIn,
  cartItems,
  wishlistItems,
  search,
  setSearch,
  priceFilter,
  setPriceFilter,
  sortBy,
  setSortBy,
}) {

  const navigate = useNavigate();

  return (
    <header className="header">

      {/* TOP */}

      <div className="navbar-top">

        <div className="logo" onClick={() => navigate("/home")}>

          <h1>NAINA</h1>

          <span>ARTISTRY</span>

        </div>

        <div className="navbar-icons">

          <div onClick={() => navigate("/wishlist")}>
            ❤️
            <small>{wishlistItems.length}</small>
          </div>

          <div onClick={() => navigate("/cart")}>
            🛒
            <small>{cartItems.length}</small>
          </div>

          <div
            onClick={() =>
              isLoggedIn
                ? navigate("/profile")
                : navigate("/login")
            }
          >
            👤
          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="navbar-bottom">

        <nav>

          <span onClick={() => navigate("/home")}>Home</span>

          <span onClick={() => navigate("/home/gold")}>Gold</span>

          <span onClick={() => navigate("/home/diamond")}>Diamond</span>

          <span onClick={() => navigate("/home/earrings")}>Earrings</span>

          <span onClick={() => navigate("/home/rings")}>Rings</span>

        </nav>

        <div className="search-area">

          <input
            type="text"
            placeholder="Search Jewellery..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">Price</option>
            <option value="under1000">Under ₹1000</option>
            <option value="1000to5000">₹1000 - ₹5000</option>
            <option value="above5000">Above ₹5000</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="lowToHigh">Low → High</option>
            <option value="highToLow">High → Low</option>
            <option value="latest">Latest</option>
          </select>

        </div>

      </div>

    </header>
  );
}

export default Navbar;