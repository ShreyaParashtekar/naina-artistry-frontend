import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail({ addToCart }) {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);


 const { id } = useParams();
 console.log("Route ID:", id);
 console.log("Products state:", products);
 const product = products.find((p) => p.id === Number(id));
 console.log("Found product:", product);


const currentIndex = products.findIndex(
  (p) => p.id === Number(id)
);

  const [quantity, setQuantity] = useState(1);

 useEffect(() => {
   fetch("http://localhost:8080/products")
     .then((res) => res.json())
     .then((data) => {
       setProducts(data);
       console.log("Products:", data);
       setLoading(false);
     })
     .catch((err) => {
       console.log(err);
       setLoading(false);
     });

   fetch(`http://localhost:8080/reviews/${id}`)
     .then((res) => res.json())
     .then((data) => setReviews(data))
     .catch((err) => console.log(err));
 }, [id]);

  // ✅ FIX: swipe support
  const touchStartX = useRef(0);



  // ❗ AFTER hooks
if (loading) return <h2>Loading...</h2>;

if (!product) {
  console.log("No product found!");
  return <h2>Product not found</h2>;
}

console.log("Rendering:", product);
  // ➡️ NEXT / PREV PRODUCT
  const nextProduct = () => {
    const nextIndex = (currentIndex + 1) % products.length;
    navigate(`/product/${products[nextIndex].id}`);
  };

  const prevProduct = () => {
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    navigate(`/product/${products[prevIndex].id}`);
  };



  // 📱 SWIPE SUPPORT
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

const handleTouchEnd = () => {};

  // 🛒 ADD TO CART
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    alert("Added to cart 🛒");
  };

  const submitReview = () => {
    if (!userName || !comment) {
      alert("Please enter your name and review.");
      return;
    }

 const review = {
   productId: Number(id),
   userName,
   comment,
   rating,
 };

    fetch("http://localhost:8080/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews([...reviews, data]);

        setUserName("");
        setComment("");
        setRating(5);

        alert("Review submitted successfully ⭐");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: "40px" }}>

      {/* 🔙 BACK */}
      <button onClick={() => navigate("/home")} style={backBtn}>
        ← Back
      </button>

      <div style={{ display: "flex", gap: "50px", alignItems: "center" }}>

        {/* 🖼 IMAGE SECTION */}
        <div
          style={imageContainer}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* ⬅ PRODUCT */}
          <button onClick={prevProduct} style={arrowLeft}>◀</button>

       <img
         src={product.imageUrl}
         alt={product.name}
         style={imageStyle}
       />
          {/* ➡ PRODUCT */}
          <button onClick={nextProduct} style={arrowRight}>▶</button>
        </div>

        {/* 📦 DETAILS */}
        <div>
          <h2>{product.name}</h2>

          <div style={{ color: "gold" }}>⭐⭐⭐⭐⭐</div>

          <p>{product.description}</p>

          <h3 style={{ color: "#ff4081" }}>₹{product.price}</h3>

          <h4>Total: ₹{product.price * quantity}</h4>

          {/* 🔢 QUANTITY */}
          <div style={{ display: "flex", alignItems: "center" }}>
<button onClick={() => setQuantity(q => Math.max(1  , q - 1))} style={qtyBtn}>
  -
</button>            <span style={{ margin: "0 15px" }}>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} style={qtyBtn}>+</button>
          </div>

          <br />

          <button onClick={handleAddToCart} style={cartBtn}>
            Add to Cart 🛒
          </button>

          <button
            onClick={() => {
              handleAddToCart();
              navigate("/checkout");
            }}
            style={buyBtn}
          >
            Buy Now ⚡
          </button>
        </div>
      </div>



      {/* 💎 RELATED PRODUCTS */}
      <h3 style={{ marginTop: "40px" }}>Related Products 💎</h3>

      <div style={{ display: "flex", gap: "20px" }}>
        {products
          .filter(p => p.id !== product.id)
          .slice(0, 3)
          .map(item => (
            <div
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img src={item.imageUrl} alt="" style={{ width: "120px" }} />
              <p>{item.name}</p>
            </div>
          ))}
      </div>
<h2 style={{ marginTop: "40px" }}>Customer Reviews ⭐</h2>

<div
  style={{
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "20px",
    marginBottom: "30px",
  }}
>
  <h3>Write a Review</h3>

  <input
    type="text"
    placeholder="Your Name"
    value={userName}
    onChange={(e) => setUserName(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
    }}
  />

  <select
    value={rating}
    onChange={(e) => setRating(Number(e.target.value))}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
    }}
  >
    <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
    <option value={4}>⭐⭐⭐⭐ (4)</option>
    <option value={3}>⭐⭐⭐ (3)</option>
    <option value={2}>⭐⭐ (2)</option>
    <option value={1}>⭐ (1)</option>
  </select>

  <textarea
    placeholder="Write your review..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    style={{
      width: "100%",
      height: "100px",
      padding: "10px",
      borderRadius: "5px",
    }}
  />

  <button
    onClick={submitReview}
    style={{
      marginTop: "15px",
      padding: "10px 20px",
      background: "#ff4081",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Submit Review ⭐
  </button>
</div>

{reviews.length > 0 ? (
  reviews.map((review) => (
    <div
      key={review.id}
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "10px",
      }}
    >
      <h4>{review.userName}</h4>

      <p>{"⭐".repeat(review.rating)}</p>

      <p>{review.comment}</p>
    </div>
  ))
) : (
  <p>No reviews yet.</p>
)}
    </div>
  );
}

/* 🎨 STYLES */
const backBtn = {
  marginBottom: "20px",
  padding: "8px",
  cursor: "pointer"
};

const imageContainer = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "10px"
};

const imageStyle = {
  width: "350px",
};

const arrowLeft = {
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  background: "#0008",
  color: "#fff",
  border: "none",
  padding: "10px",
  cursor: "pointer"
};

const arrowRight = {
  position: "absolute",
  top: "50%",
  right: "10px",
  transform: "translateY(-50%)",
  background: "#0008",
  color: "#fff",
  border: "none",
  padding: "10px",
  cursor: "pointer"
};

const qtyBtn = {
  padding: "5px 10px",
  cursor: "pointer"
};

const cartBtn = {
  padding: "10px",
  background: "#ff4081",
  color: "white",
  border: "none",
  marginRight: "10px",
  cursor: "pointer"
};

const buyBtn = {
  padding: "10px",
  background: "black",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const thumbContainer = {
  display: "flex",
  gap: "10px",
  marginTop: "20px"
};

const thumbStyle = {
  width: "60px",
  height: "60px",
  objectFit: "cover",
  cursor: "pointer"
};

export default ProductDetail;