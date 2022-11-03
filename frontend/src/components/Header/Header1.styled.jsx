import styled from 'styled-components'

const handleType = $type => {
  switch ($type) {
    case "bottom":
      return "position: absolute;"
    case "sticky":
      return "position: fixed; top: 0;"
    default:
      return ""
  }
}

const StyledHeader = styled.div`
  background: #FFFFFF;
  width: 100%;
  height: 20px;
  padding: 35px 10px;
  overflow: hidden;
  text-align: center;
  ${({ $type }) => handleType($type)};
  bottom: 0;
  z-index: 1;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;

  > div {
    transform: translateY(-50%);
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: 0.05em;
    font-family: Cormorant Garamond;
    padding-left: 5%;
    padding-right: 5%;
  }

  > a {
    font-family: "Roboto", sans-serif;
    letter-spacing: 3px;
    font-size: 0.8em;
    padding-left: 5%;
    padding-right: 5%;
    text-transform: uppercase;
  }
`;

export { StyledHeader }