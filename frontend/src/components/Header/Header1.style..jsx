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
  padding: 35px 45px;
  overflow: hidden;
  text-align: center;
  ${({ $type }) => handleType($type)};
  bottom: 0;
  z-index: 1;
  margin: 0;

  a {
    font-family: "Roboto", sans-serif;
    letter-spacing: 3px;
    font-size: 0.8em;
    padding-right: 10%;
    text-transform: uppercase;
  }
`;

export { StyledHeader }