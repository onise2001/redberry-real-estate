import { createGlobalStyle, styled } from "styled-components";

const GlobalStyles = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'FiraGO', sans-serif;
}

html {
  font-size: 62.5%;
}

`;

export const StyledPopUpSection = styled.section<{ $active: boolean }>`
  display: ${({ $active }) => ($active ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 200;
  width: 100vw;
  min-height: 100vh;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(2, 21, 38, 0.34);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const OrangeButton = styled.button`
  all: unset;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  padding: 1.4rem 1.6rem;
  background-color: #f93b1d;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #df3014;
  }
`;

export const WhiteButton = styled.button`
  all: unset;
  border: solid 1px #f93b1d;
  border-radius: 10px;
  padding: 1.4rem 1.6rem;
  color: #f93b1d;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #f93b1d;
    color: #fff;
  }
`;

export default GlobalStyles;
