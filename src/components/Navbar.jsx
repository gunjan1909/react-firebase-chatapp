import React from "react";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">ChatApp</span>
      <div className="user">
        <img
          src="https://rukminim1.flixcart.com/image/416/416/k8t3jbk0/poster/6/f/w/medium-poster-narendra-modi-ji-poster-poster-for-wall-decoration-original-imafqqrru7x2hjbw.jpeg?q=70"
          alt=""
        />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  );
}
