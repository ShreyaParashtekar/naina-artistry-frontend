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
  try {
    const response = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      navigate("/login");
    } else {
      const data = await response.text();
      console.log(data);
    }
  } catch (error) {
    console.error(error);
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