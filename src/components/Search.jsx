import React from "react";
import "./Search.scss";

export default function Search() {
  return (
    <div className="search">
      <div className="searchForm">
        <input placeholder="Find a user.." type="text" name="" id="" />
      </div>
      <div className="userChat">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt=""
        />
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  );
}
