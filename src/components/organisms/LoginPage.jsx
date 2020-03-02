import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { LoginContainer } from "../containers/LoginContainer";

import Label from "../atoms/Label/Label";
import Button from "../atoms/Button/Button";
import Heading1 from "../atoms/Heading/Heading1";
import Board from "../atoms/Board/Board";
import Link from "../atoms/Link/Link";

import LabelInput from "../molecules/LabelInput";

import color from "../../utils/color";

const LoginPage = ({ ...useLogin }) => {
  return (
    <LoginDiv>
      <LoginBoard>
        <HeadingTitle color={color.black}>EECR</HeadingTitle>
        <HeadingMessage color={color.blackDark}>
          登録して楽しくメッセージを送り合おう
        </HeadingMessage>
        <LabelInput
          label="メールアドレス"
          size="middle"
          value={useLogin.mail}
          placeholder="(例):example@gmail.com"
          onChange={useLogin.handleMailChange}
        />
        <LabelInput
          label="パスワード"
          size="middle"
          placeholder="wwwwwwwww"
          onChange={useLogin.handlePasswordChange}
          value={useLogin.password}
        />
        <ButtonContainer>
          {useLogin.canLogin ? (
            <ErrorMessage>※メールアドレスかパスワードが違います</ErrorMessage>
          ) : (
            <ErrorMessage></ErrorMessage>
          )}
          <Button color="blue" size="small">
            ログイン
          </Button>
        </ButtonContainer>
      </LoginBoard>
      <LoginBoard>
        <LinkContainer>
          <Link
            name="新規に作成される方"
            handlePageType={useLogin.handlePageType}
            type="NewLogin"
          />
        </LinkContainer>
        <LinkContainer>
          <Link
            name="パスワードを忘れてしまった方"
            handlePageType={useLogin.handlePageType}
            type="ResetLogin"
          />
        </LinkContainer>
      </LoginBoard>
    </LoginDiv>
  );
};

const LoginDiv = styled.div`
  background: ${color.lightWhite};
  width: 27%;
  height: auto;
  border: 2px solid ${color.gray};
  margin: 100px auto;
`;

const ErrorMessage = styled.p`
  margin: 0px auto;
  color: ${color.red};
  font-size: 50%;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 10px auto 20px;
`;

const LinkContainer = styled.div`
  margin: 10px auto;
  text-align: center;
`;

const LoginBoard = styled(Board)`
  margin-top: 0px;
  margin-bottom: 20px;
`;

const HeadingTitle = styled(Heading1)`
  margin: 20px 10px;
`;
const HeadingMessage = styled(Heading1)`
  margin: 2px 0px;
  font-size: 20px;
`;
export default LoginPage;
