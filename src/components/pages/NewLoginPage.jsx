import React from "react";
import styled from "styled-components";
import NewLoginPage from "../templates/NewLoginPage";

import { LoginContainer } from "../containers/LoginContainer";

export default () => {
  const useLogin = LoginContainer.useContainer();
  return <NewLoginPage useLogin={useLogin} />;
};
