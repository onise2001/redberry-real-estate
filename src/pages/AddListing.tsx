import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DragAndDrop from "../components/DragAndDrop";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { components, DropdownIndicatorProps, props } from "react-select";

const AddListing: React.FC = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState<Region[]>();
  const [agents, setAgents] = useState<Agent[]>();
  const [cities, setCitites] = useState<City[]>();

  const CustomArrow = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src="/images/arrow.png" />
      </components.DropdownIndicator>
    );
  };

  const dropDownStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      fontFamily: "FiraGO",
      cursor: "pointer",
      width: "38.4rem",
      border: "solid 1px #808a93",
      borderRadius: "6px",
      borderColor: state.selectProps.menuIsOpen ? "#808a93" : "#808a93",
      borderBottom: state.selectProps.menuIsOpen ? "none" : baseStyles.border,
      borderBottomLeftRadius: state.isFocused ? "0" : "6px",
      borderBottomRightRadius: state.isFocused ? "0" : "6px",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        borderColor: "#808a93",
      },
      fontSize: "1.4rem",
      padding: "0.55rem",
      "& span": {
        display: "none",
      },
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      cursor: "pointer",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0)",
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      padding: "0",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      fontFamily: "inherit",

      border: "solid 1px #808a93",
      padding: "0",
      margin: "0",
      borderRadius: "6px",
      borderTop: "none",
      borderTopLeftRadius: state.selectProps.menuIsOpen
        ? "0"
        : baseStyles.borderRadius,
      borderTopRightRadius: state.selectProps.menuIsOpen
        ? "0"
        : baseStyles.borderRadius,
    }),
    option: (baseStyles, { isSelected }) => ({
      ...baseStyles,
      borderTop: "solid 1px rgb(128, 138, 147) ",
      fontSize: "1.4rem",
      color: "#021526",
      padding: "1rem",
      cursor: "pointer",
      backgroundColor: isSelected ? "rgba(128,138,147,0.4)" : "#fff",
      "&:hover": { backgroundColor: "rgba(128,138,147,0.3)" },
    }),
  };

  useEffect(() => {
    const fetchAgents = async () => {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer 9cfc8fa2-e80e-42e6-91f0-3eda643de14a",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setAgents(data);
      }
    };
    fetchAgents();

    const fetchRegions = async () => {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions"
      );
      if (response.status === 200) {
        const data = await response.json();
        setRegions(data);
      }
    };
    fetchRegions();

    const fetchCities = async () => {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/cities"
      );
      if (response.status === 200) {
        const data = await response.json();
        setCitites(data);
      }
    };
    fetchCities();
  }, []);

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
                defaultChecked
              />
            </SingleInputWrapperForRadion>
            <SingleInputWrapperForRadion>
              <StyledLabel htmlFor="sell">იყიდება</StyledLabel>

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
              <StyledLabel>რეგიონი</StyledLabel>
              <Select
                placeholder="რეგიონი"
                options={regions?.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
                components={{ DropdownIndicator: CustomArrow }}
                styles={dropDownStyles}
                //menuIsOpen={true}
              />
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel>ქალაქი</StyledLabel>
              <Select
                placeholder="ქალაქი"
                options={cities?.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
                components={{ DropdownIndicator: CustomArrow }}
                styles={dropDownStyles}
                //menuIsOpen={true}
              />
            </SingleInputWrapper>
          </Row>
        </RowContainer>

        <RowContainer>
          <RowTitle>ბინის დეტალები</RowTitle>

          <Row>
            <SingleInputWrapper>
              <StyledLabel htmlFor="price">ფასი</StyledLabel>
              <StyledInput type="text" id="price" />
              <ValidationMessage>
                <CheckIcon src="/images/check.png" />
                მხოლოდ რიცხვები
              </ValidationMessage>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel htmlFor="area">ფართობი</StyledLabel>
              <StyledInput type="text" id="area" />
              <ValidationMessage>
                <CheckIcon src="/images/check.png" />
                მხოლოდ რიცხვები
              </ValidationMessage>
            </SingleInputWrapper>
          </Row>
          <Row>
            <SingleInputWrapper>
              <StyledLabel htmlFor="bedrooms">
                საძინებლების რაოდენობა*
              </StyledLabel>
              <StyledInput type="text" id="bedrooms" />
              <ValidationMessage>
                <CheckIcon src="/images/check.png" />
                მხოლოდ რიცხვები
              </ValidationMessage>
            </SingleInputWrapper>
          </Row>
        </RowContainer>

        <SingleInputWrapper>
          <StyledLabel>აღწერა*</StyledLabel>
          <StyledTextArea />
        </SingleInputWrapper>

        <SingleInputWrapper>
          <StyledLabel>ატვირთეთ ფოტო*</StyledLabel>
          <DragAndDrop />
        </SingleInputWrapper>

        <RowTitle>აგენტი</RowTitle>
        <SingleInputWrapper>
          <StyledLabel>აირჩიე</StyledLabel>
          <Select
            placeholder="აირჩიე"
            options={agents?.map((item) => {
              return { value: item.id, label: `${item.name} ${item.surname}` };
            })}
            components={{ DropdownIndicator: CustomArrow }}
            styles={dropDownStyles}
            //menuIsOpen={true}
          />
        </SingleInputWrapper>

        <StyledButtonWrapper>
          <CancelButton
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            გაუქმება
          </CancelButton>
          <SubmitButton type="submit">დაამატე ლისტინგი</SubmitButton>
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
  margin-top: 5.2rem;
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
  padding: 1.15rem;
  border-radius: 6px;
  border: solid 1px #808a93;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 13.5rem;
  outline: none;
  font-size: 1.4rem;
  color: #021526;
  padding: 1.25rem 1rem;
  border-radius: 6px;
  border: solid 1px #808a93;
  resize: none;
`;

const StyledRadioButton = styled.input``;

const ValidationMessage = styled.span`
  font-size: 1.4rem;
  color: #021526;
`;

const CheckIcon = styled.img`
  margin-right: 0.7rem;
`;

const StyledDropDown = styled.select`
  outline: none;
  cursor: pointer;
  width: 38.4rem;
  padding: 1rem;
  border-radius: 6px;
  border: solid 1px #808a93;
  font-size: 1.4rem;
  color: #021526;
`;

const StyledOption = styled.option`
  font-size: 1.4rem;
  color: #021526;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: solid 1px #808a93;
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
