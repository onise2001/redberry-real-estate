import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  StyledPopUpSection,
  OrangeButton,
  WhiteButton,
} from "../my-styled-components/GlobalStyles";
import Slider from "../components/Slider";
import { format } from "date-fns";

export default function SingleListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const [listing, setListing] = useState<Listing>({
    id: 0,
    address: "",
    description: "",
    zip_code: "",
    price: 0,
    area: 0,
    bedrooms: 0,
    is_rental: 10,
    image: "",
    city_id: 0,
    city: { id: 0, name: "", region_id: 0, region: { id: 0, name: "" } },
    agent_id: 0,
    agent: { id: 0, name: "", surname: "", email: "", phone: "", avatar: "" },
    created_at: "",
  });

  useEffect(() => {
    const fetchListing = async (id: string) => {
      const response = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer 9cfc8fa2-e80e-42e6-91f0-3eda643de14a",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        const formattedDate = format(new Date(data.created_at), "dd/MM/yyyy");
        data.created_at = formattedDate;
        setListing(data);
      }
    };

    fetchListing(id);
  }, []);

  const deleteListing = async (id: number) => {
    const response = await fetch(
      `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer 9cfc8fa2-e80e-42e6-91f0-3eda643de14a",
        },
      }
    );

    if (response.status === 200) {
      navigate("/");
    }
  };

  return (
    <StyledSection>
      <ListingWrapper>
        <ImageWrapper>
          <BackImage src="/images/arrow-left.png" />
          <ListingImage src={listing?.image} />
          <CreatedAt>{`გამოქვეყნების თარიღი ${listing?.created_at}`}</CreatedAt>
        </ImageWrapper>
        <ListingInfoWrapper>
          <ListingPrice>{`${listing?.price} ₾`}</ListingPrice>
          <StyledUl>
            <StyledLi>
              <img src="/images/location.png" />
              {`${listing?.city.name}, ${listing?.address}`}
            </StyledLi>
            <StyledLi>
              <img src="/images/area.png" />
              {`ფართი ${listing?.area}`} მ<sup>2</sup>
            </StyledLi>
            <StyledLi>
              <img src="/images/bed.png" />
              {`საძინებელი ${listing?.bedrooms}`}
            </StyledLi>
            <StyledLi>
              <img src="/images/stake.png" />
              {`საფოსტო ინდექსი ${listing?.zip_code}`}
            </StyledLi>
          </StyledUl>
          <ListingDescription>{listing?.description}</ListingDescription>
          <AgentInfoContainer>
            <AvatarWrapper>
              <AgentAvatar src={listing?.agent.avatar} />
              <AgentNameWrapper>
                <NameSpan>{`${listing?.agent.name} ${listing?.agent.surname}`}</NameSpan>
                <JobSpan>აგენტი</JobSpan>
              </AgentNameWrapper>
            </AvatarWrapper>
            <AgentContanctInfo>
              <img
                src="/images/mail.png"
                style={{ width: "1.6rem", height: "1.3rem" }}
                alt=""
              />{" "}
              {listing?.agent.email}
            </AgentContanctInfo>
            <AgentContanctInfo>
              <img
                src="/images/phone.png"
                style={{ width: "1.45rem", height: "1.7rem" }}
                alt=""
              />{" "}
              {listing?.agent.phone}
            </AgentContanctInfo>
          </AgentInfoContainer>
          <DeleteListing
            onClick={() => {
              setShowDelete(true);
            }}
          >
            ლისტინგის წაშლა
          </DeleteListing>
        </ListingInfoWrapper>
      </ListingWrapper>
      <StyledPopUpSection $active={showDelete}>
        <DeleteContainer>
          <CloseIcon
            src="/images/close.png"
            onClick={() => {
              setShowDelete(false);
            }}
          />
          <DeleteTitle>გსურთ წაშალოთ ლისტინგი?</DeleteTitle>
          <ConfirmContainer>
            <WhiteButton
              onClick={() => {
                setShowDelete(false);
              }}
            >
              გაუქმება
            </WhiteButton>
            <OrangeButton
              onClick={() => {
                deleteListing(listing?.id);
              }}
            >
              დადასტურება
            </OrangeButton>
          </ConfirmContainer>
        </DeleteContainer>
      </StyledPopUpSection>
      {/* <CreatedAt>{`გამოქვეყნების თარიღი ${listing?.created_at}`}</CreatedAt> */}
      {listing?.city.region_id !== 0 ? (
        <Slider
          currentRegionId={listing?.city.region_id}
          currentItemId={listing.id}
        />
      ) : null}
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16.2rem;
`;

const ListingWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 7rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const BackImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 2.4rem;
`;

const ListingImage = styled.img`
  width: 83rem;
`;

const ListingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 6rem;
`;

const ListingPrice = styled.h2`
  font-size: 4.8rem;
  font-weight: bold;
  color: #021526;
  margin-bottom: 0.7rem;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-bottom: 2.4rem;
`;

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 2.4rem;
  color: #808a93;
`;

const ListingDescription = styled.p`
  max-width: 50rem;
  font-size: 1.6rem;
  line-height: 1.63;
  color: #808a93;
  margin-bottom: 3rem;
`;

const AgentInfoContainer = styled.div`
  width: 100%;
  padding: 2.4rem 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: solid 1px #dbdbdb;
  gap: 1.6rem;
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;
`;

const AgentAvatar = styled.img`
  width: 7.2rem;
  height: 7.2rem;
  border-radius: 50%;
`;

const AgentNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const NameSpan = styled.span`
  font-size: 1.6rem;
  color: #021526;
`;
const JobSpan = styled.span`
  font-size: 1.4rem;
  color: #676e76;
`;

const AgentContanctInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  color: #808a93;
`;

const DeleteListing = styled.button`
  all: unset;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  color: #676e76;
  background-color: #fff;
  border-radius: 8px;
  border: solid 1px #676e76;
  max-width: 13rem;
  cursor: pointer;
  &:hover {
    background-color: #808a93;
    color: #fff;
  }
`;

const CreatedAt = styled.span`
  font-size: 1.6rem;
  color: #808a93;
  align-self: flex-end;
`;

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 0.6rem 1.3rem 5.8rem;
  width: 62.3rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 5px 5px 12px 0 rgba(2, 21, 38, 0.08);
`;

const CloseIcon = styled.img`
  align-self: flex-end;
`;

const DeleteTitle = styled.h2`
  font-size: 2rem;
  color: #2d3648;
  margin-bottom: 1rem;
`;

const ConfirmContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
