import React from "react";
import styled from "styled-components";
import SkeletonDiv from "../SkeletonDiv";

const HomeSkeleton = () => {
  return (
    <HomeSkeletonStyled>
      <SkeletonDiv width={"20vw"} height={"50vh"} br={"10px"} />
    </HomeSkeletonStyled>
  );
};

const HomeSkeletonStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default HomeSkeleton;
