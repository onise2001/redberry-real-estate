import React, { useState } from "react";
import styled from "styled-components";
import DragAndDrop from "../components/DragAndDrop";

const AddListing: React.FC = () => {
  return (
    <FormContainer>
      <Title>ლისტინგის დამატება</Title>
      <StyledForm>
        <RadionWrapper>
          <StyledLabel htmlFor="deal-type">გარიგების ტიპი*</StyledLabel>
          <RadioButtonContainer>
            <SingleInputWrapperForRadion>
              <StyledLabel htmlFor="rent">ქირავდება</StyledLabel>
              <StyledRadioButton
                type="radio"
                id="rent"
                name="deal-type"
                value="1"
              />
            </SingleInputWrapperForRadion>
            <SingleInputWrapperForRadion>
              <StyledLabel htmlFor="sell">ქირავდება</StyledLabel>

              <StyledRadioButton
                type="radio"
                id="sell"
                name="deal-type"
                value="0"
              />
            </SingleInputWrapperForRadion>
          </RadioButtonContainer>
        </RadionWrapper>
        <RowContainer>
          <RowTitle>მდებარეობა</RowTitle>

          <Row>
            <SingleInputWrapper>
              <StyledLabel htmlFor="firstname">მისამართი*</StyledLabel>
              <StyledInput type="text" id="firstname" />
              <ValidationMessage>
                <CheckIcon src="/images/check.png" />
                მინიმუმ ორი სიმბოლო
              </ValidationMessage>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel htmlFor="lastname">საფოსტო ინდექსი*</StyledLabel>
              <StyledInput type="text" id="lastname" />
              <ValidationMessage>
                <CheckIcon src="/images/check.png" />
                მხოლოდ რიცხვები
              </ValidationMessage>
            </SingleInputWrapper>
          </Row>
          <Row>
            <SingleInputWrapper>
              <StyledLabel htmlFor="firstname">რეგიონი</StyledLabel>
              <StyledInput type="text" id="email" />
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel htmlFor="firstname">ქალაქი</StyledLabel>
              <StyledInput type="text" />
            </SingleInputWrapper>
          </Row>
        </RowContainer>
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
  );
};

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

const RowContainer = styled.div`
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

const RowTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 500l;
  color: #1a1a1f;
`;

const RadionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  gap: 8.4rem;
`;

const SingleInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 100%;
`;

const SingleInputWrapperForRadion = styled(SingleInputWrapper)`
  flex-direction: row-reverse;
  width: fit-content;
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

const StyledRadioButton = styled.input``;

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

export default AddListing;
