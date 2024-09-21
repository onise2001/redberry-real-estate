import React, { useRef } from "react";
import styled from "styled-components";
import DragAndDrop, { DragAndDropRef } from "./DragAndDrop";
import { Error } from "../my-styled-components/GlobalStyles";
import {
  OrangeButton,
  StyledPopUpSection,
  WhiteButton,
  StyledInput,
  StyledLabel,
  ValidationMessage,
  SingleInputWrapper,
  Title,
  StyledForm,
  FormContainer,
} from "../my-styled-components/GlobalStyles";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRealEstateContext } from "../contexts/RealEstateContext";

interface IAddAgentProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

type AgentInputs = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar: File;
};

const AddAgent: React.FC<IAddAgentProps> = ({ active, setActive }) => {
  const { setAgents, setNewAgentId } = useRealEstateContext();
  const schema = yup.object({
    name: yup.string().min(2, "error").required(),
    surname: yup.string().min(2).required(),
    email: yup
      .string()
      .test(
        "ends-with",
        "email validation",
        (value) => value?.endsWith("@redberry.ge") || false
      )
      .required(),
    phone: yup
      .string()
      .matches(
        /^5\d{8}$/,
        "ტელეფონის ნომერი უნდა იწყებოდეს 5-ით და შეიცავდეს 9 ციფრს"
      )
      .required(),
    avatar: yup
      .mixed<File>()
      .required("Avatar is required")
      .test("file-size", "Image must not be more than 1Mb", (value) => {
        return value.size < 1024 * 1024;
      }),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<AgentInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const addAgent = async (formData: FormData) => {
    const key = "9cfc8fa2-e80e-42e6-91f0-3eda643de14a";
    const response = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/agents",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
        },
        body: formData,
      }
    );
    if (response.status === 201) {
      const data = await response.json();

      handleReset();
      setAgents((prev) => [
        ...prev,
        { value: data.id, label: `${data.name} ${data.surname}` },
      ]);
      setActive(false);
      setNewAgentId(data.id);
    } else {
      throw alert("Something Went wrong");
    }
  };

  const submit: SubmitHandler<AgentInputs> = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    addAgent(formData);
  };

  const avatarInputRef = useRef<DragAndDropRef>(null);

  const handleReset = () => {
    reset();
    if (avatarInputRef.current) {
      avatarInputRef.current.reset();
    }
    setActive(false);
  };
  return (
    <StyledPopUpSection
      id="popup"
      $active={active}
      onClick={() => {
        reset();
        setActive(false);
      }}
    >
      <FormContainer
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Title>აგენტის დამატება</Title>
        <StyledForm onSubmit={handleSubmit(submit)}>
          <Row>
            <SingleInputWrapper>
              <StyledLabel htmlFor="firstname">სახელი*</StyledLabel>
              <StyledInput
                type="text"
                id="firstname"
                $hasError={Boolean(errors.name)}
                {...register("name")}
              />
              <ValidationMessage
                $hasError={Boolean(errors.name)}
                $isValid={Boolean(watch("name") && !errors.name)}
              >
                <CheckIcon src="/images/check.png" />
                მინიმუმ ორი სიმბოლო
              </ValidationMessage>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel htmlFor="lastname">გვარი</StyledLabel>
              <StyledInput
                type="text"
                id="lastname"
                $hasError={Boolean(errors.surname)}
                {...register("surname")}
              />
              <ValidationMessage
                $hasError={Boolean(errors.surname)}
                $isValid={Boolean(watch("name") && !errors.surname)}
              >
                <CheckIcon src="/images/check.png" />
                მინიმუმ ორი სიმბოლო
              </ValidationMessage>
            </SingleInputWrapper>
          </Row>
          <Row>
            <SingleInputWrapper>
              <StyledLabel htmlFor="email">ელ-ფოსტა*</StyledLabel>
              <StyledInput
                type="text"
                id="email"
                $hasError={Boolean(errors.email)}
                {...register("email")}
              />
              <ValidationMessage
                $hasError={Boolean(errors.email)}
                $isValid={Boolean(watch("email") && !errors.email)}
              >
                <CheckIcon src="/images/check.png" />
                გამოიყენეთ @redberry.ge ფოსტა
              </ValidationMessage>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledLabel htmlFor="phone-number">ტელეფონის ნომერი</StyledLabel>
              <StyledInput
                type="text"
                id="phone-number"
                $hasError={Boolean(errors.phone)}
                {...register("phone")}
              />
              <ValidationMessage
                $hasError={Boolean(errors.phone)}
                $isValid={Boolean(watch("phone") && !errors.phone)}
              >
                <CheckIcon src="/images/check.png" />
                მხოლოდ რიცხვები (5XXXXXXXX)
              </ValidationMessage>
            </SingleInputWrapper>
          </Row>
          <SingleInputWrapper>
            <StyledLabel>ატვირთეთ ფოტო*</StyledLabel>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <DragAndDrop
                  onDrop={(acceptedFiles) => {
                    field.onChange(acceptedFiles);
                  }}
                  $hasError={Boolean(errors.avatar)}
                  ref={avatarInputRef}
                />
              )}
            />
            {errors.avatar ? <Error>{errors.avatar.message}</Error> : null}
          </SingleInputWrapper>
          <StyledButtonWrapper>
            <WhiteButton type="button" onClick={handleReset}>
              გაუქმება
            </WhiteButton>
            <OrangeButton type="submit">დაამატე აგენტი</OrangeButton>
          </StyledButtonWrapper>
        </StyledForm>
      </FormContainer>
    </StyledPopUpSection>
  );
};

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.1rem;
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

export default AddAgent;
