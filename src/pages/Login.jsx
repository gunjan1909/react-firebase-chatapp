import React from "react";
import "./LoginRegister.scss";

export default function Login() {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatApp</span>
        <span className="title">Login</span>

        <form action="">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Log In</button>
        </form>
        <p>Don't have an account? Sign Up</p>
      </div>
    </div>
  );
}
