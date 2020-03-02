import React from "react";
import styled from "styled-components";
import color from "../../../utils/color";

const Heading1 = styled.h1`
  margin: 30px 20px;
  text-align: center;
  color: ${props => props.color};
`;

export default Heading1;
