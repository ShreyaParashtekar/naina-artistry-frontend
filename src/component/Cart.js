import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  // Total Price
  const total = cartItems.reduce((sum, item) => {
    return sum + (Number(item.price) || 0) * (Number(item.quantity) || 1);
  }, 0);

  // Remove Item
  const handleRemove = (indexToRemove) => {
    const updated = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updated);
  };

  // Increase Quantity
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

  // Decrease Quantity
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

  return (
    <div className="cart-page">

      {/* LEFT SIDE */}
      <div className="cart-left">

        <h2>🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={item.id}>

              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-image"
              />

              <div className="cart-details">

                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

                <div className="qty-box">

                  <button
                    className="qty-btn"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </button>

                  <span className="qty-text">
                    {item.quantity}
                  </span>

                  <button
                    className="qty-btn"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>

              </div>

              <h3 className="item-total">
                ₹{item.price * item.quantity}
              </h3>

            </div>
          ))
        )}

      </div>

      {/* RIGHT SIDE */}

      <div className="cart-summary">

        <h3>Order Summary</h3>

        <hr />

        <p>Total Items: {cartItems.length}</p>

        <h2>Total: ₹{total}</h2>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout 🛒
        </button>

      </div>

    </div>
  );
}

export default Cart;