import styled from 'styled-components'

const StyledLoadingCube = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  z-index: 99999;
`

const StyledLoadingTitle = styled.div`
  margin-top: 6.5rem;
  font-weight: 500;
  line-height: 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
  font-family: Cormorant Garamond;
  text-transform: uppercase;
  pointer-events: none;
  user-select: none;
`

const StyledCubeWrapper = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  transform-style: preserve-3d;
  animation: rotatecube 5s infinite;

  > div {
    width: 30px;
    height: 30px;
    display: block;
    position: absolute;
    border: 0.2rem solid #FA989E;
    line-height: 30px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    border-radius: 5px;
    opacity: 1;
    /* background: #FA989E; */
  }

  @keyframes rotatecube {
    0% {
      transform: rotateX(315deg) rotateY(180deg) rotateZ(225deg);
    }
    50% {
      transform: rotateX(45deg) rotateY(0deg) rotateZ(135deg);
    }
    100% {
      transform: rotateX(315deg) rotateY(180deg) rotateZ(225deg);
    }
  }
`

const StyledCubeFront = styled.div`
  transform: rotateY(0deg) translateZ(16px);
`

const StyledCubeBack = styled.div`
  transform: rotateX(180deg) translateZ(16px);
`

const StyledCubeRight = styled.div`
  transform: rotateY(90deg) translateZ(16px);
`

const StyledCubeLeft = styled.div`
  transform: rotateY(-90deg) translateZ(16px);
`

const StyledCubeTop = styled.div`
  transform: rotateX(90deg) translateZ(16px);
`

const StyledCubeBottom = styled.div`
  transform: rotateX(-90deg) translateZ(16px);
`

export { 
  StyledLoadingCube,
  StyledLoadingTitle,
  StyledCubeWrapper, 
  StyledCubeFront,
  StyledCubeBack,
  StyledCubeRight,
  StyledCubeLeft,
  StyledCubeTop,
  StyledCubeBottom
}