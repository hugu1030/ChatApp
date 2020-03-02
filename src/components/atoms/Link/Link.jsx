import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default ({ name, handlePageType, type }) => {
  return (
    <a href="#" onClick={() => handlePageType(type)}>
      {name}
    </a>
  );
};
