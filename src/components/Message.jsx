import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import "./Message.scss";

export default function Message({ msg }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className="message owner">
      {/* <div className="messageInfo">
        <img src={currentUser.photoURL} alt="" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        <img
          src="https://rukminim1.flixcart.com/image/416/416/k8t3jbk0/poster/6/f/w/medium-poster-narendra-modi-ji-poster-poster-for-wall-decoration-original-imafqqrru7x2hjbw.jpeg?q=70"
          alt=""
        />
      </div> */}
    </div>
  );
}
