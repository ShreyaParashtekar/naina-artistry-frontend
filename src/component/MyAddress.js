import React, { useState, useEffect } from "react";

function MyAddress() {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");

    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  const saveAddress = () => {
    if (address.trim() === "") {
      alert("Please enter an address.");
      return;
    }

    localStorage.setItem("address", address);

    alert("Address updated successfully ✅");
  };

  return (
    <div
      style={{
        maxWidth: "650px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 5px 15px rgba(0,0,0,.12)"
      }}
    >
      <h2>📍 My Address</h2>

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your complete address..."
        style={{
          width: "100%",
          height: "150px",
          padding: "12px",
          marginTop: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />

      <button
        onClick={saveAddress}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "14px",
          background: "#111",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Save Address
      </button>
    </div>
  );
}

export default MyAddress;