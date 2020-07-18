import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import firebase from "firebase";
import { db } from "../firebase";

import "../styles/Post.css";

const Post = ({ postId, signedUser, username, imageUrl, caption }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const commentRef = useRef(null);

  const focusInput = () => {
    commentRef.current.focus();
  };

  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() }))
        );
      });
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: signedUser.displayName,
      text: comment,
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={username} src="src" />
        <strong>{username}</strong>
      </div>
      <img src={imageUrl} alt={`${username} uploaded pic`} />
      {signedUser && (
        <div className="post__actions">
          <FavoriteBorderIcon />

          <span onClick={focusInput}>
            <ChatBubbleOutlineIcon />
          </span>
          <ShareIcon />
        </div>
      )}
      <p className="post__caption">
        <strong>{username} : </strong>
        {caption}
      </p>
      <div className="post__comments">
        {comments.length === 0 ? <h4>No comments</h4> : <h4>Comments</h4>}
        {comments.map(({ id, comment: { username, text } }) => (
          <p key={id}>
            <strong>{username} : </strong> {text}
          </p>
        ))}
      </div>
      {signedUser && (
        <div className="post__addcomments">
          <form>
            <input
              type="text"
              placeholder="Add a comment..."
              ref={commentRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" disabled={!comment} onClick={postComment}>
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
