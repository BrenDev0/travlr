import React from "react";
import styled from "styled-components";

const SkeletonDiv = ({ width, height, br }) => {
  return (
    <SkeletonStyled
      style={{ width: width, height: height, borderRadius: br }}
    ></SkeletonStyled>
  );
};

const SkeletonStyled = styled.div`
  animation: skeleton-loading 1s linear infinite alternate;
  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 70%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
    }
  }
`;

export default SkeletonDiv;
