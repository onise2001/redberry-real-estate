import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ISliderProps {
  currentRegionId: number;
}

const Slider: React.FC<ISliderProps> = ({ currentRegionId }) => {
  const navigate = useNavigate();
  const [similarListings, setSimilarListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer 9cfc8fa2-e80e-42e6-91f0-3eda643de14a",
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setSimilarListings(data);
      }
    };

    fetchListings();
  }, []);

  return (
    <StyledSliderContainer>
      {similarListings
        .filter((item) => item.city.region_id === currentRegionId)
        .map((listing) => {
          return (
            // <Card key={listing.id}>
            //   <CardImg src={listing?.image} />
            //   <CardBody>
            //     <Price>{`${listing?.price} ₾`}</Price>
            //     <Address></Address>
            //   </CardBody>
            // </Card>
            <Card
              key={listing.id}
              onClick={() => {
                navigate(`/listing/${listing.id}`);
              }}
            >
              <DealType>
                {listing.is_rental === 0 ? "იყიდება" : "ქირავდება"}
              </DealType>
              <CardImg src={listing.image} />
              <CardBody>
                <Price>{listing.price} ₾</Price>
                <Address>
                  <img src="/images/location.png" />
                  {`${listing.city.name}, ${listing.address}`}
                </Address>
                <IconsContainer>
                  <SingleIconContainer>
                    <img src="/images/bed.png" alt="" />
                    <IconText>{listing.bedrooms}</IconText>
                  </SingleIconContainer>
                  <SingleIconContainer>
                    <img src="/images/area.png" alt="" />
                    <IconText>
                      {listing.area} მ<sup>2</sup>
                    </IconText>
                  </SingleIconContainer>
                  <SingleIconContainer>
                    <img src="/images/stake.png" alt="" />
                    <IconText>{listing.zip_code}</IconText>
                  </SingleIconContainer>
                </IconsContainer>
              </CardBody>
            </Card>
          );
        })}
    </StyledSliderContainer>
  );
};

const StyledSliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  overflow-x: auto;
  max-width: 100%;
`;

const Card = styled.div`
  min-width: 38.4rem;
  box-shadow: 5px 5px 12px 0 rgba(2, 21, 38, 0.08);
  border-radius: 15px;
  position: relative;
`;

const CardImg = styled.img`
  width: 100%;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  padding: 2.2rem 2.5rem;
`;

const Price = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  color: #021526;
`;

const Address = styled.span`
  font-size: 1.6rem;
  color: rgba(2, 21, 38, 0.7);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
`;

const SingleIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
`;

const IconText = styled.span`
  font-size: 1.6rem;

  color: rgba(2, 21, 38, 0.7);
`;

const DealType = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.8rem 1.8rem 0.6rem;
  border-radius: 15px;
  background-color: rgba(2, 21, 38, 0.5);
  color: #fff;
  position: absolute;
  top: 2.3rem;
  left: 2.3rem;
`;

export default Slider;
