import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("address");

    if (!saved) return;

    try {
      const addr = JSON.parse(saved);

      if (typeof addr === "object") {
        setAddress(
  `${addr.fullName}
  ${addr.house}
  ${addr.area}
  ${addr.city}, ${addr.state}
  ${addr.pincode}
  Mobile: ${addr.mobile}`
        );
      } else {
        setAddress(saved);
      }
    } catch (e) {
      // Address was saved as plain text
      setAddress(saved);
    }
  }, []);

  useEffect(() => {
    const savedAddress = localStorage.getItem("address");

    if (savedAddress) {
      try {
        const addr = JSON.parse(savedAddress);

        setAddress(
  `${addr.fullName}
  ${addr.house}
  ${addr.area}
  ${addr.city}, ${addr.state} - ${addr.pincode}
  Mobile: ${addr.mobile}`
        );
      } catch {
        // If address is stored as plain text
        setAddress(savedAddress);
      }
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (address.trim() === "") {
      alert("Please enter your delivery address.");
      return;
    }


    // Save updated address if user edits it
    localStorage.setItem("address", address);

    const newOrder = {
      date: new Date().toLocaleString(),
      address: address,
      items: JSON.stringify(cartItems),
      total: total,
      status: "Placed",
    };

    await fetch("https://naina-artistry-backend.onrender.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((res) => res.json())
      .then(() => {
        // Clear cart
        localStorage.removeItem("cart");

        if (setCartItems) {
          setCartItems([]);
        }

        alert("Order Placed Successfully 🎉");

        navigate("/orders");
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong!");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        padding: "15px",
      }}
    >
     <div
       style={{
         width: "100%",
         maxWidth: "450px",
         background: "#fff",
         padding: "20px",
         borderRadius: "12px",
         boxShadow: "0 5px 15px rgba(0,0,0,.15)",
         boxSizing: "border-box",
       }}
     >
        <h2 style={{ textAlign: "center" }}>
          Checkout 🛒
        </h2>

        <h3>Order Summary</h3>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
             style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
               flexWrap: "wrap",
               gap: "5px",
               marginBottom: "10px",
             }}
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))
        )}

        <hr />

        <h3 style={{ textAlign: "right" }}>
          Total : ₹{total}
        </h3>

        <textarea
          placeholder="Enter Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            width: "100%",
            height: "90px",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "none",
          }}
        />

        <button
          onClick={handlePayment}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            background: "#111",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Place Order 💳
        </button>

        <button
          onClick={() => navigate("/cart")}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "14px",
            background: "#ddd",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ← Back to Cart
        </button>
      </div>
    </div>
  );
}

export default Checkout;