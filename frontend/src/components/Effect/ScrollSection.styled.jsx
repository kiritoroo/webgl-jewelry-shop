import styled from "styled-components";

const StyledContent = styled.div`
  position: absolute;
  font-weight: 500;
  line-height: 1rem;
  font-size: 8rem;
  letter-spacing: 0.5rem;
  font-family: Cormorant Garamond;

  @media screen and (max-width: 1200px) {
    position: 'absolute';
    font-weight: 300;
    line-height: 1rem;
    font-size: 4rem;
    letter-spacing: 0.5rem;
  }
`

export { StyledContent }
