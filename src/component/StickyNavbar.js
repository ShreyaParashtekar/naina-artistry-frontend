import React from "react";
import { useNavigate } from "react-router-dom";
import "./StickyNavbar.css";

function StickyNavbar({
  search,
  setSearch,
  priceFilter,
  setPriceFilter,
  sortBy,
  setSortBy,
}) {

  const navigate = useNavigate();

  return (

    <div className="sticky-navbar">

      <div className="menu">

        <span onClick={() => navigate("/home")}>Home</span>

        <span onClick={() => navigate("/home/gold")}>Gold</span>

        <span onClick={() => navigate("/home/diamond")}>Diamond</span>

        <span onClick={() => navigate("/home/earrings")}>Earrings</span>

        <span onClick={() => navigate("/home/rings")}>Rings</span>

      </div>

      <div className="sticky-right">

        <input
          type="text"
          placeholder="Search Jewellery..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            setTimeout(() => {
              document.getElementById("products")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 100);
          }}
        />
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="Price">Price</option>
          <option value="under20000">Under ₹20,000</option>
          <option value="20000to50000">₹20,000 - ₹50,000</option>
          <option value="50000to100000">₹50,000 - ₹1,00,000</option>
          <option value="above100000">Above ₹1,00,000</option>
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

  );
}

export default StickyNavbar;