import React from "react";
import styled from "styled-components";
import SkeletonDiv from "../SkeletonDiv";

const HomeSkeleton = () => {
  return (
    <HomeSkeletonStyled>
      <SkeletonDiv width={"20%"} height={"50%"} />
    </HomeSkeletonStyled>
  );
};

const HomeSkeletonStyled = styled.div`
  display: flex;
`;

export default HomeSkeleton;
