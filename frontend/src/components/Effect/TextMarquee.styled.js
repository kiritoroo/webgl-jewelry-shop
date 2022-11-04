import styled from 'styled-components'

const StyledMarquee = styled.div`
  background: white;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.125);
  height: 100px;
  margin: auto;
  overflow: hidden;
  position: relative;
  width: 100vw;
  z-index: 2;

  ::before, ::after {
    background: linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 100%);
    content: "";
    height: 100px;
    position: absolute;
    width: 400px;
    z-index: 3;
  }

  ::after {
    right: 0;
    top: 0;
    transform: rotateZ(180deg);
  }

  ::before {
    left: 0;
    top: 0;
  }
`

const StyledMarqueeTrack = styled.div`
  animation: scroll 30s linear infinite;
  display: flex;
  width: calc(400px * 6);

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-400px * 3));
    }
  }
`

const StyledMarqueeItem = styled.div`
  height: 100px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0.05em;
  font-family: Cormorant Garamond;
  text-transform: uppercase;
  pointer-events: none;
  user-select: none;
`

export { StyledMarquee, StyledMarqueeTrack, StyledMarqueeItem }