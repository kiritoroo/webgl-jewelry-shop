import React, { useEffect, useRef } from 'react'
import { 
  StyledLoadingCube,
  StyledLoadingTitle,
  StyledCubeWrapper,
  StyledCubeFront,
  StyledCubeBack,
  StyledCubeRight,
  StyledCubeLeft,
  StyledCubeTop,
  StyledCubeBottom
} from './LoadingCuber.styled'

const LoadingCube = () => {
  const titleRef = useRef()

  // useEffect(() => {
  //   titleRef.current.classList.add('fx-wave')
  // })
  
  return (
    <StyledLoadingCube>
      <StyledCubeWrapper>
        <StyledCubeFront />
        <StyledCubeBack />
        <StyledCubeRight />
        <StyledCubeLeft />
        <StyledCubeTop />
        <StyledCubeBottom />
      </StyledCubeWrapper>
      <StyledLoadingTitle ref={titleRef}>
        Johnny Dảrk & CO.
      </StyledLoadingTitle>
    </StyledLoadingCube>
  )
}

export default LoadingCube
