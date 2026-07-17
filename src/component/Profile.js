import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="profileContainer">

      <div className="profileCard">

        <div className="profileHeader">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />

          <h2>Welcome</h2>

          <p>{userEmail}</p>
        </div>

        <div className="profileMenu">

          <div onClick={() => navigate("/orders")}>
            📦 My Orders
          </div>

          <div onClick={() => navigate("/wishlist")}>
            ❤️ Wishlist
          </div>

         <div
           className="profile-item"
           onClick={() => navigate("/address")}
         >
           📍 Saved Address
         </div>
          <div onClick={() => navigate("/change-password")}>
            🔒 Change Password
          </div>

          <div
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            🚪 Logout
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;