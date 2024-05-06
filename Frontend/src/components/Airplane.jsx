import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";

const Airplane = () => {
  const [stage, setStage] = useState(1);

  useLayoutEffect(() => {
    setInterval(() => {
      if (stage === 3) {
        setStage(1);
      } else {
        setStage(stage + 1);
      }
    }, 3000);
  }, [stage]);

  return (
    <AirplaneStyled>
      {stage === 1 && <i className="fa-solid fa-plane-departure"></i>}
      {stage === 2 && <i className="fa-solid fa-plane"></i>}
      {stage === 3 && <i className="fa-solid fa-plane-arrival"></i>}
    </AirplaneStyled>
  );
};

const AirplaneStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .fa-solid {
    color: var(--green);
  }
`;

export default Airplane;
