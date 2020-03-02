import React from "react";
import styled from "styled-components";
import ResetLoginPage from "../templates/ResetLoginPage";

import { LoginContainer } from "../containers/LoginContainer";

export default () => {
  const useLogin = LoginContainer.useContainer();
  return <ResetLoginPage useLogin={useLogin} />;
};
