import React from "react";
import { LoginContainer } from "../containers/LoginContainer";

import LoginPage from "../pages/LoginPage";
import Login from "../selectors/Login";

export default () => {
  return (
    <>
      <LoginContainer.Provider>
        <Login />
      </LoginContainer.Provider>
    </>
  );
};
