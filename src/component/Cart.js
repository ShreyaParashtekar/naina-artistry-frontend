import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  // 💰 total price
 const total = cartItems.reduce((sum, item) => {
   return sum + (Number(item.price) || 0) * (Number(item.quantity) || 1);
 }, 0);

  // ❌ remove item
  const handleRemove = (indexToRemove) => {
    const updated = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updated);
  };

  // ➕ increase qty
 const increaseQty = (id) => {
   setCartItems((prevItems) =>
     prevItems.map((item) => {
       if (item.id === id) {

         if (item.quantity >= item.stock) {
           alert(`Only ${item.stock} item(s) available in stock.`);
           return item;
         }

         return {
           ...item,
           quantity: item.quantity + 1,
         };
       }

       return item;
     })
   );
 };

  // ➖ decrease qty
  const decreaseQty = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

console.log(cartItems);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "30px",
      }}
    >
      {/* 🛒 LEFT SIDE */}
      <div style={{ width: "65%" }}>


        <h2>🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                marginBottom: "20px",
                background: "white",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginRight: "20px",
                }}
              />

              {/* 📦 DETAILS */}
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                {/* 🔢 QUANTITY */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button onClick={() => decreaseQty(item.id)}>-</button>

                  <span style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </span>

                  <button onClick={() => increaseQty(item.id)}>
                    +
                  </button>
                </div>

                {/* ❌ REMOVE */}
                <button
                  onClick={() => handleRemove(index)}
                  style={{
                    marginTop: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Remove
                </button>
              </div>

              {/* 💰 ITEM TOTAL */}
              <h3>₹{item.price * item.quantity}</h3>
            </div>
          ))
        )}
      </div>

      {/* 💳 RIGHT SIDE */}
      <div
        style={{
          width: "30%",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          height: "fit-content",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Order Summary</h3>
        <hr />

        <p>Total Items: {cartItems.length}</p>
        <h2>Total: ₹{total}</h2>

        <button
          onClick={() => navigate("/checkout")}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            background: "#ff4081",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Proceed to Checkout 🛒
        </button>
      </div>
    </div>
  );
}

export default Cart;