import React from "react";
import "./LoginRegister.scss";
import addAvatar from "../assets/addAvatar.png";

export default function Register() {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">ChatApp</span>
        <span className="title">Register</span>

        <form action="">
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={addAvatar} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>You already have an accont? Login</p>
      </div>
    </div>
  );
}
