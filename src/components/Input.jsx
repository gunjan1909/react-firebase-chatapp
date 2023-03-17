import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import "./Input.scss";
import Img from "../assets/img.png";
import Attach from "../assets/attach.png";
import {
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input({ chatName }) {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          /* const downloadURL = getDownloadURL(uploadTask.snapshot.ref);

          const msg = {
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          };
          updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion(msg),
          });*/
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      const msg = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      };
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion(msg),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: { text },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  //console.log(data.chatId);
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type your message.."
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text ? text : ""}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => {
            if (e.target.files[0]) {
              setImg(e.target.files[0]);
              document.getElementById(
                "testest2"
              ).innerHTML = `<img src=${URL.createObjectURL(
                e.target.files[0]
              )} alt="" /> <span>${e.target.files[0].name} </span>`;
            }
          }}
          value={img ? img : ""}
        />
        <label id="testest2" htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button
          onClick={() => {
            //console.log(data.chatId);'
            console.log(chatName);
            if (chatName === undefined) alert("Please select a user");
            else handleSend();
          }}
        >
          Send
        </button>
        {/* handle error */}
        {err && <p>Something went wrong</p>}
      </div>
    </div>
  );
}
