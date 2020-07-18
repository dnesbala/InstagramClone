import React, { useState, useEffect } from "react";
import { Modal, Button, FormControl, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../instagram_logo.png";
import "../styles/Modal.css";

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
    width: 250,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid lightgray",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SimpleModal = ({ action, sendUserCredentials, performAction }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (sendUserCredentials) {
      sendUserCredentials({ username, email, password });
    }
  }, [username, email, password]);

  const body =
    action === "Sign Up" ? (
      <>
        <h3>Sign Up for New Account</h3>
        <FormControl>
          <TextField
            type="text"
            label="Username"
            margin="dense"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            type="email"
            id="email"
            label="Email"
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            id="password"
            label="Password"
            margin="dense"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </>
    ) : (
      <>
        <h3>Sign In To Your Account</h3>
        <FormControl>
          <TextField
            type="email"
            label="Email"
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            margin="dense"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </>
    );

  return (
    <div>
      <Button
        variant="text"
        color="default"
        type="button"
        className="action__button"
        onClick={() => setOpen(true)}
      >
        {action}
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={`${classes.paper} modal__body`}>
          <img src={logo} alt="Instagram" />
          {body}
          <Button
            className="modal__actionbutton"
            variant="contained"
            color="primary"
            onClick={performAction}
          >
            {action}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SimpleModal;
