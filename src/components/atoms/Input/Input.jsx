import React from "react";
import styled from "styled-components";
import color from "../../../utils/color";

const Input = styled.input`
  width: 50%;
  height: 30%;
  placeholder: ${props => props.placeholder};
  &:active {
    border: solid 2px ${color.blue};
  }
`;

export default Input;
