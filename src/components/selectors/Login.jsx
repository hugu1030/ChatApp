import React from "react";

import LoginPage from "../pages/LoginPage";
import NewLoginPage from "../pages/NewLoginPage";
import ResetLoginPage from "../pages/ResetLoginPage";

import { LoginContainer } from "../containers/LoginContainer";

export default () => {
  const useLogin = LoginContainer.useContainer();
  return (
    <>
      {useLogin.pageType === "LoginPage" ? (
        <LoginPage />
      ) : useLogin.pageType === "NewLogin" ? (
        <NewLoginPage />
      ) : (
        <ResetLoginPage />
      )}
    </>
  );
};
