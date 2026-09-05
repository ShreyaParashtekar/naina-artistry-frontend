import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import ProductList from "./component/ProductList";
import Cart from "./component/Cart";
import Login from "./component/Login";
import Register from "./component/Register";
import TopHeader from "./component/TopHeader";
import StickyNavbar from "./component/StickyNavbar";
import Checkout from "./component/Checkout";
import Hero from "./component/Hero";
import ProductDetail from "./component/ProductDetail";
import Profile from "./component/Profile";
import Wishlist from "./component/Wishlist";
import "./App.css";
import Orders from "./component/Orders";
import AdminLogin from "./component/AdminLogin";
import AdminDashboard from "./component/AdminDashboard";
import AddProduct from "./component/AddProduct";
import ManageProducts from "./component/ManageProducts";
import EditProduct from "./component/EditProduct";
import ManageOrders from "./component/ManageOrders";
import ManageUsers from "./component/ManageUsers";
import Footer from "./component/Footer";
import Address from "./component/Address";
import ChangePassword from "./component/ChangePassword";
import HomePage from "./component/HomePage";
import "./responsive.css";



function CategoryPage({
  products,
  addToCart,
  search,
  setSearch,
  wishlistItems,
  toggleWishlist,
  priceFilter,
  setPriceFilter,
  sortBy,
  setSortBy,
}) {
  const { category } = useParams();

  // ✅ FILTER BY CATEGORY
  const filteredProducts =
    category
      ? products.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        )
      : products;

 return (
   <>
     <Hero />



     <ProductList
       products={filteredProducts}
       addToCart={addToCart}
       search={search}
       priceFilter={priceFilter}
       sortBy={sortBy}
       wishlistItems={wishlistItems}
       toggleWishlist={toggleWishlist}
     />
   </>
 );
}
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  handleAddProduct();
}, []);



useEffect(() => {
  localStorage.setItem("orders", JSON.stringify(orders));
}, [orders]);
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("orders"));
  if (saved) setOrders(saved);
}, []);
  // Load Cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCartItems(savedCart);
    }
  }, []);

  // Save Cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Load Wishlist
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));

    if (savedWishlist) {
      setWishlistItems(savedWishlist);
    }
  }, []);

  // Save Wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

const addToCart = (product) => {
  const loggedIn = localStorage.getItem("userEmail");

  if (!loggedIn) {
    alert("Please login to add products to cart.");
    window.location.href = "/login";
    return;
  }

  if (product.stock <= 0) {
    alert("Product is out of stock.");
    return;
  }

  setCartItems((prev) => {
    const existing = prev.find((item) => item.id === product.id);

    // Product already in cart
    if (existing) {
      if (existing.quantity >= product.stock) {
        alert(`Only ${product.stock} item(s) available in stock.`);
        return prev;
      }

      return prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    // First item
    return [
      ...prev,
      {
        ...product,
        quantity: 1,
      },
    ];
  });

  alert(`${product.name} added to cart 🛒`);
};
 const decreaseQty = (productId) => {
   setCartItems((prev) =>
     prev
       .map((item) =>
         item.id === productId
           ? { ...item, quantity: item.quantity - 1 }
           : item
       )
       .filter((item) => item.quantity > 0)
   );
 };

const handleAddProduct = () => {
  setLoading(true);

  fetch("https://naina-artistry-backend.onrender.com/products") // Change to your Render URL after deployment
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};
  const toggleWishlist = (product) => {
    const exists = wishlistItems.find((item) => item.id === product.id);

    if (exists) {
      setWishlistItems(
        wishlistItems.filter((item) => item.id !== product.id)
      );
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  return (
   <Router>

     <TopHeader
       isLoggedIn={isLoggedIn}
       cartItems={cartItems}
       wishlistItems={wishlistItems}
     />

        <StickyNavbar
            search={search}
            setSearch={setSearch}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />


     <Routes>

      <Route
        path="/"
        element={
        <HomePage
          loading={loading}
          products={products}
          addToCart={addToCart}
          search={search}
          setSearch={setSearch}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          wishlistItems={wishlistItems}
          toggleWishlist={toggleWishlist}
        />
        }
      />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUserEmail={setUserEmail}
            />
          }
        />

        <Route path="/register" element={<Register />} />

       <Route
         path="/home"
         element={
          <HomePage
            loading={loading}
            products={products}
            addToCart={addToCart}
            search={search}
            setSearch={setSearch}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            wishlistItems={wishlistItems}
            toggleWishlist={toggleWishlist}
          />
         }
       />

      <Route
        path="/home/:category"
        element={
          <CategoryPage
            products={products}
            addToCart={addToCart}
            search={search}
            setSearch={setSearch}
            wishlistItems={wishlistItems}
            toggleWishlist={toggleWishlist}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        }
      />


        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              addToCart={addToCart}
              decreaseQty={decreaseQty}
            />
          }
        />
       <Route
         path="/checkout"
         element={
           <Checkout
             cartItems={cartItems}
             setCartItems={setCartItems}
           />
         }
       />
      <Route
        path="/wishlist"
        element={
          <Wishlist
            wishlistItems={wishlistItems}
            setWishlistItems={setWishlistItems}
            addToCart={addToCart}
          />
        }
      />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />
        <Route
          path="/orders"
          element={<Orders orders={orders} />}
        />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            localStorage.getItem("admin") === "true"
              ? <AdminDashboard />
              : <AdminLogin />
          }
        />

        <Route
          path="/add-product"
          element={<AddProduct onAdd={handleAddProduct} />}
        />

        <Route
          path="/manage-products"
          element={<ManageProducts />}
        />
        <Route
         path="/manage-orders"
         element={<ManageOrders />}
         />
         <Route path="/users" element={<ManageUsers />} />
        <Route
          path="/edit-product/:id"
          element={<EditProduct />}
        />
<Route
  path="/address"
  element={<Address />}
/>


      </Routes>

      <Footer />
    </Router>
  );
}

export default App;