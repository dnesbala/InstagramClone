import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

import { db, auth } from "./firebase";
import Post from "./components/Post";
import Modal from "./components/Modal";
import UploadModal from "./components/UploadModal";

import logo from "./instagram_logo.png";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [userCredentials, setUserCredentials] = useState([]);
  const [user, setUser] = useState([null]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in
        setUser(authUser);
      } else {
        // user is not logged in
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const signUp = () => {
    auth
      .createUserWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password
      )
      .then((authUser) =>
        authUser.user.updateProfile({
          displayName: userCredentials.username,
        })
      )
      .catch((err) => alert(err.message));
  };

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(
        userCredentials.email,
        userCredentials.password
      )
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="app">
      <div className="app__header">
        <div className="app__navbar">
          <img src={logo} alt="Instagram Logo" />
          <div className="app__useractions">
            {user ? (
              <>
                <UploadModal user={user} />
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => auth.signOut()}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Modal
                  action="Sign Up"
                  performAction={signUp}
                  sendUserCredentials={(credentials) =>
                    setUserCredentials({ ...credentials })
                  }
                />
                <Modal
                  action="Log In"
                  performAction={signIn}
                  sendUserCredentials={(credentials) =>
                    setUserCredentials({ ...credentials })
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
      {posts.map(({ id, post: { username, imageUrl, caption } }) => (
        <Post
          key={id}
          postId={id}
          signedUser={user}
          username={username}
          imageUrl={imageUrl}
          caption={caption}
        />
      ))}
    </div>
  );
}

export default App;
