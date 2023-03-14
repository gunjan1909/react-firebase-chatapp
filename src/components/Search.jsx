import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import "./Search.scss";

export default function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    // console.log(q);

    //EXTRA
    if (q.exists) {
      setErr(false);
    } else {
      setErr(true);
    }

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setErr(false);
      });
    } catch (err) {
      //console.log(err);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    // e.code === "Enter" && handleSearch();
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUserName("");
    setUser(null);
  };
  //console.log(err);
  return (
    <div className="search">
      <div className="searchForm">
        <input
          placeholder="Find a user.."
          type="text"
          onKeyDown={handleKey}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
        />
      </div>
      {err && <span className="err">User not found!</span>}
      {user && !err && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
