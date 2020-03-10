import React from "react";
import styled from "styled-components";
import color from "../../../utils/color";

const Button = styled.button`
  border: 3px solid ${color.gray};
  border-radius: 5px;
  color: ${color.white};
  font-size: 15px;
  font-family: cursive;
  padding: 0.25em 1em;
  margin: 0px auto;
  &[size="small"] {
    font-size: 10px;
  }
  &[size="middle"] {
    font-size: 30px;
  }
  &[size="big"] {
    font-size: 40px;
  }
  &[color="green"] {
    background-color: ${color.green};
    border-color: ${color.greenLight};
  }
  &[color="blue"] {
    background-color: ${color.blue};
    border-color: ${color.blueDark};
  }
  &:active {
    background: ${color.royalblue};
  }
`;

export default Button;
