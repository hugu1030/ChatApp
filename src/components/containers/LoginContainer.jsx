import React, { useState } from "react";
import { createContainer } from "unstated-next";

const useLoginStore = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [name, setName] = useState("");
  const [pageType, setPageType] = useState("LoginPage");

  const [canLogin, setCanLogin] = useState(false);

  const handleMailChange = event => {
    setMail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };
  const handleRePasswordChange = event => {
    setRePassword(event.target.value);
  };
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handlePageType = type => {
    setPageType(type);
  };
  const handleCanLogin = () => {
    setCanLogin(!canLogin);
  };

  return {
    mail,
    password,
    repassword,
    name,
    pageType,
    canLogin,
    handleMailChange,
    handlePasswordChange,
    handleRePasswordChange,
    handleNameChange,
    handlePageType,
    handleCanLogin
  };
};

export const LoginContainer = createContainer(useLoginStore);
