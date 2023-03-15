import React, { useContext } from "react";
import Cam from "../assets/cam.png";
import Add from "../assets/add.png";
import More from "../assets/more.png";
import Messages from "./Messages";
import Input from "./Input";
import "./Chat.scss";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        {data && <span>{data.user?.displayName}</span>}
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
