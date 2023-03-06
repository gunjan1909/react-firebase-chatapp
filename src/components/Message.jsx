import React from "react";
import "./Message.scss";

export default function Message() {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img
          src="https://rukminim1.flixcart.com/image/416/416/k8t3jbk0/poster/6/f/w/medium-poster-narendra-modi-ji-poster-poster-for-wall-decoration-original-imafqqrru7x2hjbw.jpeg?q=70"
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        <img
          src="https://rukminim1.flixcart.com/image/416/416/k8t3jbk0/poster/6/f/w/medium-poster-narendra-modi-ji-poster-poster-for-wall-decoration-original-imafqqrru7x2hjbw.jpeg?q=70"
          alt=""
        />
      </div>
    </div>
  );
}
