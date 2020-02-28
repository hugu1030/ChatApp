import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 15px;
  height: 12px;
  placeholder: ${props => props.placeholder};
  &:hover {
    border: solid 2px ${color.blue};
  }
`;

export default Input;
