import React from "react";
import styled from "styled-components";

import Button from "../atoms/Button/Button";
import Heading1 from "../atoms/Heading/Heading1";
import Board from "../atoms/Board/Board";
import Link from "../atoms/Link/Link";

import LabelInput from "../molecules/LabelInput";

import color from "../../utils/color";
import { LoginContainer } from "../containers/LoginContainer";

export default ({ useLogin }) => {
  return (
    <LoginDiv>
      <LoginBoard>
        <LabelInput
          label="メールアドレス"
          size="middle"
          value={useLogin.mail}
          placeholder="(例):example@gmail.com"
          onChange={useLogin.handleMailChange}
        />
        <LabelInput
          label="氏名"
          placeholder="田中太郎"
          onChange={useLogin.handleNameChange}
          value={useLogin.name}
        ></LabelInput>
        <LabelInput
          label="パスワード"
          placeholder="wwwwwwwww"
          onChange={useLogin.handlePasswordChange}
          value={useLogin.password}
        />
        <LabelInput
          label="パスワード再入力"
          placeholder="wwwwwwww"
          onChange={useLogin.handlePasswordChange}
          value={useLogin.password}
        ></LabelInput>
        <ButtonContainer>
          <Button color="blue" size="small">
            登録する
          </Button>
        </ButtonContainer>
      </LoginBoard>
      <LoginBoard>
        <LinkContainer>
          <Link
            name="アカウントをお持ちの方"
            handlePageType={useLogin.handlePageType}
            type="LoginPage"
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

const ButtonContainer = styled.div`
  text-align: center;
  margin: 20px auto;
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
