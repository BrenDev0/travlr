import React from 'react'
import styled from 'styled-components'
import SkeletonDiv from '../SkeletonDiv'

const RegisterSkeleton = () => {
  return (
    <RegisterStyled>
        <SkeletonDiv  width={"50%"} height={"10%"} br={"10px"} />
        <div className="ticket-skeleton">
            <SkeletonDiv width={"50%"} height={"100%"} br={"10px"} />
            <SkeletonDiv width={"25%"} height={"100%"} br={"10px"} />
        </div>
    </RegisterStyled>
  )
}

const RegisterStyled = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;



.ticket-skeleton {
    margin-top: 7%;
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
`

export default RegisterSkeleton
