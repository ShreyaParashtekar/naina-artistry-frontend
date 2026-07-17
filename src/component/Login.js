import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";


function Login({ setIsLoggedIn, setUserEmail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async () => {

   // Validation
   if (!email.trim() || !password.trim()) {
     alert("Please enter email and password");
     return;
   }

   try {
const response = await fetch("https://naina-artistry-backend.onrender.com/users/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         email,
         password,
       }),
     });

     const data = await response.text();

  if (response.ok && data === "Login Successful") {

      setIsLoggedIn(true);
      setUserEmail(email);

      // Save login details
      localStorage.setItem("userEmail", email);


      navigate("/home");
  }

     else {
        alert(data);
    }

   } catch (error) {
     alert("Server not running");
     console.error(error);
   }
 };
 return (
   <div className="loginPage">
     <div className="loginCard">

       <h2>Welcome Back</h2>

       <p>Login to your Naina Artistry account</p>

       <input
         type="email"
         placeholder="Email Address"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
       />

       <input
         type="password"
         placeholder="Password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
       />

       <button onClick={handleLogin}>
         Login
       </button>

       <p className="registerLink">
         Don't have an account?
         <span onClick={() => navigate("/register")}> Register</span>
       </p>

     </div>
   </div>

  );
}

export default Login;