import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
const navigate = useNavigate();

const handleRegister = async () => {

  // Name validation
  if (user.name.trim() === "") {
    alert("Please enter your name");
    return;
  }

  if (user.name.trim().length < 2) {
    alert("Name must contain at least 2 characters");
    return;
  }

  const namePattern = /^[A-Za-z ]+$/;

  if (!namePattern.test(user.name.trim())) {
    alert("Name should contain only letters");
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(user.email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Password validation
  if (user.password.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  if (!/[A-Z]/.test(user.password)) {
    alert("Password must contain at least one uppercase letter");
    return;
  }

  if (!/[a-z]/.test(user.password)) {
    alert("Password must contain at least one lowercase letter");
    return;
  }

  if (!/[0-9]/.test(user.password)) {
    alert("Password must contain at least one number");
    return;
  }

  try {
    const response = await fetch(
      "https://naina-artistry-backend.onrender.com/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (response.ok) {
      alert("Registration successful!");
      navigate("/login");
   } else {
     const data = await response.text();
     console.log(data);

     if (
       response.status === 409 ||
       data.toLowerCase().includes("already") ||
       data.toLowerCase().includes("exist")
     ) {
       alert("Email already registered. Please login.");
     } else {
       alert("Registration failed. Please try again.");
     }
   }

  } catch (error) {
    console.error(error);
    alert("Unable to connect to server");
  }
};
  return (
    <div className="registerPage">
      <div className="registerCard">

        <h1>Create Account</h1>

        <p>Join Naina Artistry ✨</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={user.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />

        <button onClick={handleRegister}>
          Register
        </button>

        <p className="loginText">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </p>

      </div>
    </div>




  );
}

export default Register;