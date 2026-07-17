import React, { useState } from "react";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    const email = localStorage.getItem("userEmail");

    try {
      const response = await fetch(
        "https://naina-artistry-backend.onrender.com/users/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
        }
      );

      const message = await response.text();

      alert(message);

      if (message === "Password changed successfully") {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        // Optional: force user to log in again
        localStorage.removeItem("password");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "50px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 5px 20px rgba(0,0,0,.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Change Password 🔒
      </h2>

      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleChangePassword} style={buttonStyle}>
        Update Password
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default ChangePassword;