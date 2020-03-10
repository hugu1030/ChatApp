import React from "react";
import styled from "styled-components";
import LoginPage from "../organisms/LoginPage";
import { LoginContainer } from "../containers/LoginContainer";

export default ({ ...useLogin }) => {
  return <LoginPage {...useLogin} />;
};
