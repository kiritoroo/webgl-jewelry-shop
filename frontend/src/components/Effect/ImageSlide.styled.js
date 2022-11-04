import styled from 'styled-components'

const StyledItemBlur = styled.div`
  padding: 50px 0;
  position: relative;
  background-color: rgb(255, 255, 255);
  filter: blur(10px);

  > img {
    max-width: 30%;
    width: 30%;
    height: auto;
  }
`

export { 
  StyledItemBlur,
}