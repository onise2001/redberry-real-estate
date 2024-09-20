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

export const Error = styled.span`
  font-size: 1.2rem;
  color: #f93b1d;
`;

export const NoInfoSpan = styled.span`
  font-size: 2rem;
  color: rgba(2, 21, 38, 0.8);
`;

export const StyledInput = styled.input<{ $hasError: boolean }>`
  outline: none;
  width: 38.4rem;
  font-size: 1.4rem;
  color: #021526;
  padding: 1.15rem;
  border-radius: 6px;
  border: solid 1px ${({ $hasError }) => ($hasError ? "red" : "#808a93")};
`;

export const StyledLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: #021526;
`;

export const ValidationMessage = styled.span<{
  $isValid: boolean;
  $hasError: boolean;
}>`
  font-size: 1.4rem;
  color: ${({ $isValid, $hasError }) =>
    $hasError ? "red" : $isValid ? "green" : "#021526"};
`;

export const SingleInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: 500;
  color: #021526;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

export const FormContainer = styled.div`
  margin: auto;
  padding: 8.7rem 10.5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
`;

export default GlobalStyles;
