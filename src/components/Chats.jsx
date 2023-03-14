import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import "./Chats.scss";

export default function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("useEffect");
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        //console.log(doc.data());
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  //console.log(chats);
  //console.log(Object.entries(chats));
  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => {
            return (
              <div className="userChat" key={chat[0]}>
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                  <span>{chat[1].userInfo.displayName}</span>
                  {/* <p>{chat[1].lastMessage?.text}</p> */}
                </div>
              </div>
            );
          })}
    </div>
  );
}
