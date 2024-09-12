import React, { useState } from "react";
import styled from "styled-components";
import DragAndDrop from "./DragAndDrop";

interface IAddAgentProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAgent: React.FC<IAddAgentProps> = ({ active, setActive }) => {
  return (
    <StyledSection $active={active}>
      <FormContainer>
        <Title>აგენტის დამატება</Title>
        <StyledForm>
          <Row>
            <SingleInputWrapper>
              <StyledLabel htmlFor="firstname">სახელი*</StyledLabel>
              <StyledInput type="text" id="firstname" />
              <ValidationMessage>
                <CheckIcon src="/images/check.png" />
                მინიმუმ ორი სიმბოლო
              </ValidationMessage>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel htmlFor="lastname">გვარი</StyledLabel>
              <StyledInput type="text" id="lastname" />
              <ValidationMessage>
                <CheckIcon src="/images/check.png" />
                მინიმუმ ორი სიმბოლო
              </ValidationMessage>
            </SingleInputWrapper>
          </Row>
          <Row>
            <SingleInputWrapper>
              <StyledLabel htmlFor="email">ელ-ფოსტა*</StyledLabel>
              <StyledInput type="text" id="email" />
              <ValidationMessage>
                <CheckIcon src="/images/check.png" />
                გამოიყენეთ @redberry.ge ფოსტა
              </ValidationMessage>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel htmlFor="phone-number">ტელეფონის ნომერი</StyledLabel>
              <StyledInput type="text" id="phone-number" />
              <ValidationMessage>
                <CheckIcon src="/images/check.png" />
                მხოლოდ რიცხვები
              </ValidationMessage>
            </SingleInputWrapper>
          </Row>
          <SingleInputWrapper>
            <StyledLabel>ატვირთეთ ფოტო*</StyledLabel>
            <DragAndDrop />
          </SingleInputWrapper>
          <StyledButtonWrapper>
            <CancelButton
              onClick={() => {
                setActive(false);
              }}
            >
              გაუქმება
            </CancelButton>
            <SubmitButton type="submit">დაამატე აგენტი</SubmitButton>
          </StyledButtonWrapper>
        </StyledForm>
      </FormContainer>
    </StyledSection>
  );
};

const StyledSection = styled.section<{ $active: boolean }>`
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

const FormContainer = styled.div`
  margin: auto;
  padding: 8.7rem 10.5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
`;

const Title = styled.h2`
  font-size: 3.2rem;
  font-weight: 500;
  color: #021526;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.1rem;
`;

const SingleInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: #021526;
`;

const StyledInput = styled.input`
  outline: none;
  width: 38.4rem;
  font-size: 1.4rem;
  color: #021526;
  padding: 1.25rem 1rem;
  border-radius: 6px;
  border: solid 1px #808a93;
`;

const ValidationMessage = styled.span`
  font-size: 1.4rem;
  color: #021526;
`;

const CheckIcon = styled.img`
  margin-right: 0.7rem;
`;

const StyledButtonWrapper = styled.div`
  align-self: flex-end;
  justify-self: flex-end;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 6.1rem;
`;

const CancelButton = styled.button`
  all: unset;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  color: #f93b1d;
  border: solid 1px #f93b1d;
  padding: 1.4rem 1.6rem;
  border-radius: 10px;
  background-color: #fff;
`;

const SubmitButton = styled(CancelButton)`
  background-color: #f93b1d;
  border: none;
  color: #fff;
`;

export default AddAgent;
