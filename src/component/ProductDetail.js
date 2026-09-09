import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail({ addToCart }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const touchStartX = useRef(0);

  const product = products.find((p) => p.id === Number(id));

  const currentIndex = products.findIndex(
    (p) => p.id === Number(id)
  );

  useEffect(() => {
    setQuantity(1);

    fetch("https://naina-artistry-backend.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    fetch(
      `https://naina-artistry-backend.onrender.com/reviews/${id}`
    )
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  /* =========================
     NEXT PRODUCT
  ========================= */

  const nextProduct = () => {
    if (products.length === 0) return;

    const nextIndex =
      (currentIndex + 1) % products.length;

    navigate(`/product/${products[nextIndex].id}`);
  };

  /* =========================
     PREVIOUS PRODUCT
  ========================= */

  const prevProduct = () => {
    if (products.length === 0) return;

    const prevIndex =
      (currentIndex - 1 + products.length) %
      products.length;

    navigate(`/product/${products[prevIndex].id}`);
  };

  /* =========================
     SWIPE
  ========================= */

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;

    const difference =
      touchStartX.current - touchEndX;

    if (Math.abs(difference) < 50) return;

    if (difference > 0) {
      nextProduct();
    } else {
      prevProduct();
    }
  };

  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    alert("Added to cart 🛒");
  };

  /* =========================
     REVIEW
  ========================= */

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

    fetch(
      "https://naina-artistry-backend.onrender.com/reviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      }
    )
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
    <div className="product-detail-page">

      {/* =================================================
          PRODUCT
      ================================================= */}

      <div className="product-detail-container">

        {/* IMAGE */}

        <div
          className="product-image-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          <button
            className="product-arrow left"
            onClick={prevProduct}
          >
            ◀
          </button>

          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />

          <button
            className="product-arrow right"
            onClick={nextProduct}
          >
            ▶
          </button>

        </div>


        {/* DETAILS */}

        <div className="product-info">

          <h2>{product.name}</h2>

          <div className="product-rating">
            ⭐⭐⭐⭐⭐
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <h3 className="product-price">
            ₹{product.price}
          </h3>

          <h4 className="product-total">
            Total: ₹{product.price * quantity}
          </h4>


          {/* QUANTITY */}

          <div className="quantity-box">

            <button
              className="qty-btn"
              onClick={() =>
                setQuantity((q) =>
                  Math.max(1, q - 1)
                )
              }
            >
              -
            </button>

            <span className="quantity-number">
              {quantity}
            </span>

            <button
              className="qty-btn"
              onClick={() =>
                setQuantity((q) => q + 1)
              }
            >
              +
            </button>

          </div>


          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div className="action-buttons">

            <button
              className="product-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart 🛒
            </button>

            <button
              className="product-buy-btn"
              onClick={() => {
                handleAddToCart();
                navigate("/checkout");
              }}
            >
              Buy Now ⚡
            </button>

          </div>

        </div>
      </div>


      {/* =================================================
          RELATED PRODUCTS
      ================================================= */}

      <h3 className="related-title">
        Related Products 💎
      </h3>

      <div className="related-products">

        {products
          .filter((p) => p.id !== product.id)
          .slice(0, 3)
          .map((item) => (
            <div
              key={item.id}
              className="related-card"
              onClick={() =>
                navigate(`/product/${item.id}`)
              }
            >

              <img
                src={item.imageUrl}
                alt={item.name}
              />

              <p>{item.name}</p>

            </div>
          ))}

      </div>


      {/* =================================================
          REVIEWS
      ================================================= */}

      <h2 className="reviews-title">
        Customer Reviews ⭐
      </h2>


      <div className="review-form">

        <h3>Write a Review</h3>

        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) =>
            setUserName(e.target.value)
          }
        />

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
        >
          <option value={5}>
            ⭐⭐⭐⭐⭐ (5)
          </option>

          <option value={4}>
            ⭐⭐⭐⭐ (4)
          </option>

          <option value={3}>
            ⭐⭐⭐ (3)
          </option>

          <option value={2}>
            ⭐⭐ (2)
          </option>

          <option value={1}>
            ⭐ (1)
          </option>
        </select>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />

        <button
          className="submit-review-btn"
          onClick={submitReview}
        >
          Submit Review ⭐
        </button>

      </div>


      {/* EXISTING REVIEWS */}

      {reviews.length > 0 ? (

        reviews.map((review) => (

          <div
            key={review.id}
            className="review-card"
          >

            <h4>{review.userName}</h4>

            <p>
              {"⭐".repeat(review.rating)}
            </p>

            <p>{review.comment}</p>

          </div>

        ))

      ) : (

        <p className="no-reviews">
          No reviews yet.
        </p>

      )}

    </div>
  );
}

export default ProductDetail;