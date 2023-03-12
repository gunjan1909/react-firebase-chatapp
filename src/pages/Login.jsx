import React, { useState } from "react";
import "./LoginRegister.scss";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [err, setErr] = useState(false);
  //navigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  const myFunction = () => {
    var x = document.getElementById("password");
    console.log(x);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  const styleForShowPassLabel = {
    color: "blue",
    userSelect: "none",
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="logo">ChatApp</h1>
        <h2 className="title">Login</h2>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input id="password" type="password" placeholder="Password" />
          <div style={{ display: "flex" }}>
            <input type="checkbox" onClick={myFunction} id="showpass" />
            <label style={styleForShowPassLabel} htmlFor="showpass">
              Show Password
            </label>
          </div>
          <button>Log In</button>
          {err && <p>Invalid Email or Password</p>}
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
