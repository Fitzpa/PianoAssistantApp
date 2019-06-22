import React from "react";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../Session";
import Messages from "../Messages";
import Time from "../Time";

const HomePage = () => (
  <div>
    <p>The Home Page is accessible by every signed in user.</p>
    <Time />
    <Messages />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
