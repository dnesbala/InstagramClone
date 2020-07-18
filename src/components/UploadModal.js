import React, { useState } from "react";
import { Modal, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageUploader from "./ImageUploader";

import logo from "../instagram_logo.png";
import "../styles/UploadModal.css";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid lightgray",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const UploadModal = ({ user }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="text"
        color="default"
        type="button"
        onClick={() => setOpen(true)}
      >
        Upload
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={`${classes.paper} modal__body`}>
          <img src={logo} alt="Instagram" />
          <ImageUploader username={user.displayName} openModal={setOpen} />
        </div>
      </Modal>
    </div>
  );
};

export default UploadModal;
