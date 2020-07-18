import React, { useState } from "react";
import firebase from "firebase";
import { CircularProgress, Button } from "@material-ui/core";
import { storage, db } from "../firebase";

import "../styles/ImageUploader.css";

const ImageUploader = ({ username, openModal }) => {
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const uploadedImg = e.target.files[0];
    if (uploadedImg) {
      setImage(uploadedImg);
    }
  };

  const handleUpload = () => {
    const uploadImage = storage.ref(`images/${image.name}`).put(image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        // when the state of image (uploading...) changes, it takes snapshot and updates the progress
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        alert(err.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // add post to database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username,
              caption,
              imageUrl: url,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
            openModal(false);
          })
          .catch((err) => console.log(err.message));
      }
    );
  };

  return (
    <div className="imageuploader">
      <h3>Upload Picture</h3>
      <CircularProgress variant="static" value={progress} />
      <textarea
        cols="40"
        rows="5"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      ></textarea>

      <input type="file" required onChange={handleFileChange} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </div>
  );
};

export default ImageUploader;
