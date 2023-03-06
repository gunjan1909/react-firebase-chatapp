import React from "react";
import "./Home.scss";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
