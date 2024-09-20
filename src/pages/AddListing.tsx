import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DragAndDrop from "../components/DragAndDrop";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { components, DropdownIndicatorProps } from "react-select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  StyledInput,
  StyledLabel,
  ValidationMessage,
  SingleInputWrapper,
  Title,
  StyledForm,
  FormContainer,
} from "../my-styled-components/GlobalStyles";

type ListingInputs = {
  address: string;
  description: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  image: File;
  city_id: number;
  region_id: number;
  agent_id: number;
};

const AddListing: React.FC = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState<SelectOption[]>([]);
  const [agents, setAgents] = useState<SelectOption[]>([]);
  const [cities, setCitites] = useState<City[]>([]);

  const CustomArrow = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src="/images/arrow.png" />
      </components.DropdownIndicator>
    );
  };

  const dropDownStyles = (hasError: boolean) => ({
    control: (baseStyles, state) => ({
      ...baseStyles,
      fontFamily: "FiraGO",
      cursor: "pointer",
      width: "38.4rem",
      border: `solid 1px ${hasError ? "red" : "#808a93"}`,
      borderRadius: "6px",
      borderColor: state.selectProps.menuIsOpen
        ? "#808a93"
        : hasError
        ? "red"
        : "#808a93",
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
  });

  const schema = yup.object({
    is_rental: yup.string().matches(/^\d+$/, "error").required(),
    address: yup.string().min(2, "error").required(),
    zip_code: yup.string().matches(/^\d+$/, "error").required(),
    region_id: yup.string().matches(/^\d+$/, "error").required(),
    city_id: yup.string().matches(/^\d+$/, "error").required(),
    price: yup.string().matches(/^\d+$/, "error").required(),
    area: yup
      .string()
      .matches(/^-?\d+(\.\d+)?$/, "error")
      .required(),
    bedrooms: yup.string().matches(/^\d+$/, "error").required(),
    description: yup.string().required("error"),
    image: yup.mixed().required(),
    agent_id: yup.string().matches(/^\d+$/, "error").required(),
  });

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const region = watch("region_id");
  const addListing = async (formData) => {
    const response = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 9cfc8fa2-e80e-42e6-91f0-3eda643de14a",
        },

        body: formData,
      }
    );
    if (response.status === 201) {
      const data = await response.json();
      navigate(`/listing/${data.id}`);
    }
  };

  const submit: SubmitHandler<ListingInputs> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    addListing(formData);
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
        setAgents(
          data.map((item) => {
            return { label: `${item.name} ${item.surname}`, value: item.id };
          })
        );
      }
    };
    fetchAgents();

    const fetchRegions = async () => {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions"
      );
      if (response.status === 200) {
        const data = await response.json();
        setRegions(
          data.map((item) => {
            return { label: item.name, value: item.id };
          })
        );
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
      <StyledForm onSubmit={handleSubmit(submit)}>
        <Controller
          name="is_rental"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <RadionWrapper>
              <StyledLabel htmlFor="deal-type">გარიგების ტიპი*</StyledLabel>
              <RadioButtonContainer>
                <SingleInputWrapperForRadion>
                  <StyledLabel htmlFor="sell">იყიდება</StyledLabel>
                  <StyledRadioButton
                    {...field}
                    type="radio"
                    id="sell"
                    name="deal-type"
                    value={0}
                    checked={field.value === 0}
                    onChange={() => field.onChange(0)}
                  />
                </SingleInputWrapperForRadion>
                <SingleInputWrapperForRadion>
                  <StyledLabel htmlFor="rent">ქირავდება</StyledLabel>
                  <StyledRadioButton
                    {...field}
                    type="radio"
                    id="rent"
                    name="deal-type"
                    value={1}
                    checked={field.value === 1}
                    onChange={() => field.onChange(1)}
                  />
                </SingleInputWrapperForRadion>
              </RadioButtonContainer>
            </RadionWrapper>
          )}
        />

        <RowContainer>
          <RowTitle>მდებარეობა</RowTitle>

          <Row>
            <SingleInputWrapper>
              <StyledLabel htmlFor="address">მისამართი*</StyledLabel>
              <StyledInput
                type="text"
                id="address"
                $hasError={Boolean(errors.address)}
                {...register("address")}
              />
              <ValidationMessage
                $hasError={Boolean(errors.address)}
                $isValid={Boolean(watch("address") && !errors.address)}
              >
                <CheckIcon src="/images/check.png" />
                მინიმუმ ორი სიმბოლო
              </ValidationMessage>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel htmlFor="zip_code">საფოსტო ინდექსი*</StyledLabel>
              <StyledInput
                type="text"
                id="zip_code"
                $hasError={Boolean(errors.zip_code)}
                {...register("zip_code")}
              />
              <ValidationMessage
                $hasError={Boolean(errors.zip_code)}
                $isValid={Boolean(watch("zip_code") && !errors.zip_code)}
              >
                <CheckIcon src="/images/check.png" />
                მხოლოდ რიცხვები
              </ValidationMessage>
            </SingleInputWrapper>
          </Row>
          <Row>
            <SingleInputWrapper>
              <StyledLabel>რეგიონი</StyledLabel>
              <Controller
                name="region_id"
                control={control}
                render={({ field }) => (
                  <Select<SelectOption>
                    {...field}
                    placeholder="რეგიონი"
                    options={regions?.map((item) => ({
                      value: item.value,
                      label: item.label,
                    }))}
                    value={regions.find(
                      (region) => region.value === field.value
                    )}
                    components={{ DropdownIndicator: CustomArrow }}
                    styles={dropDownStyles(Boolean(errors.region_id))}
                    onChange={(option) =>
                      field.onChange(option ? option.value : null)
                    }

                    //menuIsOpen={true}
                  />
                )}
              />
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel>ქალაქი</StyledLabel>
              <Controller
                name="city_id"
                control={control}
                render={({ field }) => (
                  <Select<SelectOption>
                    {...field}
                    placeholder="ქალაქი"
                    options={
                      region !== 0
                        ? cities
                            ?.filter((item) => item.region_id === region)
                            .map((item) => ({
                              value: item.id,
                              label: item.name,
                            }))
                        : undefined
                    }
                    value={{
                      label: cities?.find((item) => item.id === field.value)
                        ?.name,
                      value: cities?.find((item) => item.id === field.value)
                        ?.id,
                    }}
                    components={{ DropdownIndicator: CustomArrow }}
                    styles={dropDownStyles(Boolean(errors.city_id))}
                    onChange={(option) =>
                      field.onChange(option ? option?.value : null)
                    }
                    //menuIsOpen={true}
                  />
                )}
              />
            </SingleInputWrapper>
          </Row>
        </RowContainer>

        <RowContainer>
          <RowTitle>ბინის დეტალები</RowTitle>

          <Row>
            <SingleInputWrapper>
              <StyledLabel htmlFor="price">ფასი</StyledLabel>
              <StyledInput
                type="text"
                id="price"
                $hasError={Boolean(errors.price)}
                {...register("price")}
              />
              <ValidationMessage
                $hasError={Boolean(errors.price)}
                $isValid={Boolean(watch("price") && !errors.price)}
              >
                <CheckIcon src="/images/check.png" />
                მხოლოდ რიცხვები
              </ValidationMessage>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel htmlFor="area">ფართობი</StyledLabel>
              <StyledInput
                type="text"
                id="area"
                $hasError={Boolean(errors.area)}
                {...register("area")}
              />
              <ValidationMessage
                $hasError={Boolean(errors.area)}
                $isValid={Boolean(watch("area") && !errors.area)}
              >
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
              <StyledInput
                type="text"
                id="bedrooms"
                $hasError={Boolean(errors.bedrooms)}
                {...register("bedrooms")}
              />
              <ValidationMessage
                $hasError={Boolean(errors.bedrooms)}
                $isValid={Boolean(watch("bedrooms") && !errors.bedrooms)}
              >
                <CheckIcon src="/images/check.png" />
                მხოლოდ რიცხვები
              </ValidationMessage>
            </SingleInputWrapper>
          </Row>
        </RowContainer>

        <SingleInputWrapper>
          <StyledLabel>აღწერა*</StyledLabel>
          <StyledTextArea
            $hasError={Boolean(errors.description)}
            {...register("description")}
          />
        </SingleInputWrapper>

        <SingleInputWrapper>
          <StyledLabel>ატვირთეთ ფოტო*</StyledLabel>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <DragAndDrop
                onDrop={(acceptedFile) => {
                  field.onChange(acceptedFile);
                }}
                $hasError={Boolean(errors.image)}
              />
            )}
          />
        </SingleInputWrapper>

        <RowTitle>აგენტი</RowTitle>
        <SingleInputWrapper>
          <StyledLabel>აირჩიე</StyledLabel>
          <Controller
            name="agent_id"
            control={control}
            render={({ field }) => (
              <Select<SelectOption>
                {...field}
                placeholder="აირჩიე"
                options={agents?.map((item) => {
                  return {
                    value: item.value,
                    label: item.label,
                  };
                })}
                value={agents.find((item) => item.value === field.value)}
                components={{ DropdownIndicator: CustomArrow }}
                styles={dropDownStyles(Boolean(errors.agent_id))}
                onChange={(option) => field.onChange(option?.value)}
                //menuIsOpen={true}
              />
            )}
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
  font-family: "HelveticaNeue", sans-serif;
  font-weight: 500;
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

const SingleInputWrapperForRadion = styled(SingleInputWrapper)`
  flex-direction: row-reverse;
  width: fit-content;
`;

const StyledTextArea = styled.textarea<{ $hasError: boolean }>`
  width: 100%;
  height: 13.5rem;
  outline: none;
  font-size: 1.4rem;
  color: #021526;
  padding: 1.25rem 1rem;
  border-radius: 6px;
  border: solid 1px ${({ $hasError }) => ($hasError ? "red" : "#808a93")};
  resize: none;
`;

const StyledRadioButton = styled.input``;

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
