import React from "react";
import styled from "styled-components";
import color from "../../../utils/color";

const Label = styled.label`
  display: block;
  font-size: 12px;
  color: ${color.black};
  text-align: center;
  margin: 20px auto;
  &[size="small"] {
    font-size: 10px;
  }
  &[size="middle"] {
    font-size: 20px;
  }
  &[size="big"] {
    font-size: 30px;
  }
  &[color="black"] {
    color: ${color.black};
  }
  $[color="red"] {
    color: ${color.red};
  }
`;

export default Label;
