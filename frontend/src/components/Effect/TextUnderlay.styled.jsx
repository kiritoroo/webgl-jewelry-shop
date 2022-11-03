import styled from 'styled-components'

const StyledTextUnderlay = styled.div`
  pointer-events: none;
  position: absolute;
  top: 20%;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;

  > div:nth-child(1) {
    position: absolute;
    color: #CB6B56;
    top: 40%;
    left: 30%;
    transform: translateY(-70%);
    opacity: 0.2;
    font-weight: 600;
    font-size: 25rem;
    line-height: 100%;
    letter-spacing: -0.05em;
    font-family: 'Qwitcher Grypen', cursive;
    z-index: -1 !important;

    @media screen and (max-width: 1200px) {
      left: 20%;
      font-weight: 600;
      font-size: 15rem;
      line-height: 100%;
      letter-spacing: 0.05rem;
    }
  }

  > div:nth-child(2) {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      text-align: center;
      color: #ffffff;

      > div:nth-child(1) {
        white-space: pre;
        margin-bottom: 2.5rem;
        font-weight: 600;
        line-height: 4rem;
        font-size: 8rem;
        letter-spacing: 1rem;
        white-space: inherit;
        /* font-family: Cormorant Garamond; */
        /* font-family: 'Archivo', sans-serif; */
        /* font-family: Liu Jian Mao Cao; */
        /* font-family: 'Playfair Display SC', serif; */
        font-family: 'Playfair Display SC', serif;
        /* font-family: 'Qwitcher Grypen', cursive; */

        @media screen and (max-width: 1200px) {
          font-weight: 600;
          line-height: 4rem;
          font-size: 4rem;
          letter-spacing: 1rem;
        }
      }

      > div:nth-child(2) {
        font-size: 3rem;
        font-weight: 200;
        font-family: Liu Jian Mao Cao;
        @media screen and (max-width: 1200px) {
          font-size: 2rem;
        }
      }
    }
  }
`

export { StyledTextUnderlay }