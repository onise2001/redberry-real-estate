import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function SingleListing() {
  const { id } = useParams();

  const [listing, setListing] = useState<Listing>();

  useEffect(() => {
    const fetchListing = async (id: string | undefined) => {
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
        setListing(data);
      }
    };

    fetchListing(id);
  }, []);

  return (
    <StyledSection>
      <ListingWrapper>
        <ListingImage src={listing?.image} />
        <ListingInfoWrapper>
          <ListingPrice>{listing?.price}</ListingPrice>
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
              <img src="/images/mail.png" alt="" /> {listing?.agent.email}
            </AgentContanctInfo>
            <AgentContanctInfo>
              <img src="/images/phone.png" alt="" /> {listing?.agent.phone}
            </AgentContanctInfo>
          </AgentInfoContainer>
          <DeleteListing>ლისტინგის წაშლა</DeleteListing>
        </ListingInfoWrapper>
      </ListingWrapper>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16.7rem 0 16.2rem;
`;

const ListingWrapper = styled.div`
  width: 100%;
  display: flex;

  align-items: center;
  justify-content: flex-start;
  gap: 7rem;
  padding-right: 18rem;
`;

const ListingImage = styled.img`
  max-width: 83rem;
`;

const ListingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  padding: 0.2rem 0;
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
  gap: 0.5rerm;
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
`;
