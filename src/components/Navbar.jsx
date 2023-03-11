import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import "./Navbar.scss";

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">ChatApp</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
}
