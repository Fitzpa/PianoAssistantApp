import React from "react";
import "./signOut.css";
import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <button className="px" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);
