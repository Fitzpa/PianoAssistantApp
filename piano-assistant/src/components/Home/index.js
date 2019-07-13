import React from "react";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../Session";

import Time from "../Time";

const HomePage = () => (
  <div className="p-2 bg-danger boxShadow radius-5">
    <Time />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
