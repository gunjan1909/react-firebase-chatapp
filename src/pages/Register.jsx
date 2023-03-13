import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import "./LoginRegister.scss";
import addAvatar from "../assets/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [err, setErr] = useState(false);
  //navigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    /* try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName+date}`);

      await uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (err) => {
          //console.log(err);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
    }
    catch (err) {
     // console.log(err);
      setErr(true);
    }
    */
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            // console.log(err);
            setErr(true);
          }
        });
      });
    } catch (err) {
      //console.log(err);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h1 className="logo">ChatApp</h1>
        <h2 className="title">Register</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" autoComplete="on" />
          {/* change display of input when file added */}
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                document.getElementById(
                  "testest"
                ).innerHTML = `<img src=${URL.createObjectURL(
                  e.target.files[0]
                )} alt="" /> <span>${e.target.files[0].name} </span>`;
              }
            }}
          />
          <label id="testest" htmlFor="file">
            <img src={addAvatar} alt="" />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span className="error">Something went wrong</span>}
        </form>
        <p>
          You already have an accont? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
