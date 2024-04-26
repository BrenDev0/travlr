import React from "react";
import styled from "styled-components";

const SkeletonDiv = ({ width, height }) => {
  return <SkeletonDiv style={{ width: width, height: height }}></SkeletonDiv>;
};

const SkeletonStyled = styled.div`
  background: black;
`;

export default SkeletonDiv;
