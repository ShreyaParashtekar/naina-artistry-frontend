import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopHeader.css";

function TopHeader({
  isLoggedIn,
  cartItems,
  wishlistItems,
}) {

  const navigate = useNavigate();

  return (
    <div className="top-header">

      <div
        className="logo"
        onClick={() => navigate("/home")}
      >
        <h1>NAINA</h1>
        <span>ARTISTRY</span>
      </div>

      <div className="top-icons">

       <div
         onClick={() => {
           const loggedIn = localStorage.getItem("userEmail");

           if (loggedIn) {
             navigate("/wishlist");
           } else {
             navigate("/login");
           }
         }}
       >
         ❤️
         <small>{wishlistItems.length}</small>
       </div>
<div
  onClick={() => {
    console.log("Cart clicked");

    const loggedIn = localStorage.getItem("userEmail");
    console.log(loggedIn);

    if (loggedIn) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  }}
>
  🛒
  <small>{cartItems.length}</small>
</div>

        <div
         onClick={() => {
           const loggedIn = localStorage.getItem("userEmail");

           if (loggedIn) {
             navigate("/profile");
           } else {
             navigate("/login");
           }
         }}
        >
          👤
        </div>

      </div>

    </div>
  );
}

export default TopHeader;