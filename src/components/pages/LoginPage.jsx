import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginContainer } from "../containers/LoginContainer";

import LoginPage from "../templates/LoginPage";

export default () => {
  const useLogin = LoginContainer.useContainer();
  return (
    <div>
      <LoginPage {...useLogin} />
    </div>
  );
};
