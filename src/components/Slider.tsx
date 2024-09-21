import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Address,
  Card,
  CardBody,
  CardImg,
  DealType,
  IconsContainer,
  IconText,
  NoInfoSpan,
  Price,
  SingleIconContainer,
} from "../my-styled-components/GlobalStyles";

interface ISliderProps {
  currentRegionId: number;
  currentItemId: number;
}

const Slider: React.FC<ISliderProps> = ({ currentRegionId, currentItemId }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [similarListings, setSimilarListings] = useState<Listing[]>([]);
  const [transformNumber, setTransformNumber] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const visibleSlides = 4;

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

        setSimilarListings(
          data.filter((item: Listing) => {
            return (
              item.city.region_id === currentRegionId &&
              item.id !== currentItemId
            );
          })
        );
      }
    };
    if (currentRegionId !== 0) {
      fetchListings();
    }
  }, [currentRegionId, currentItemId]);

  useEffect(() => {
    if (cardRef.current) {
      const width = cardRef.current.getBoundingClientRect().width + 20;
      setCardWidth(width);
    }
  }, [similarListings]);

  const slideRight = () => {
    const maxSlide = (similarListings.length - visibleSlides) * cardWidth;

    if (transformNumber < maxSlide) {
      setIsTransitioning(true);
      setTransformNumber((prev) => Math.min(prev + cardWidth, maxSlide));
    } else {
      setTimeout(() => {
        setIsTransitioning(false);
        setTransformNumber(0);
      }, 500);
    }
  };

  const slideLeft = () => {
    if (transformNumber > 0) {
      setIsTransitioning(true);
      setTransformNumber((prev) => Math.max(prev - cardWidth, 0));
    } else {
      setTimeout(() => {
        setIsTransitioning(false);
        setTransformNumber(
          (similarListings.length - visibleSlides) * cardWidth
        );
      }, 500);
    }
  };

  useEffect(() => {
    if (!isTransitioning) return;

    const resetTransition = () => {
      setIsTransitioning(false);
    };

    const timer = setTimeout(resetTransition, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isTransitioning]);

  return (
    <SliderSection>
      <SliderTitle>ბინები მსგავს ლოკაციაზე</SliderTitle>

      {similarListings.length > 0 ? (
        <SliderContainer>
          <LeftArrow src="/images/arrow-left.png" onClick={slideLeft} />
          <StyledSliderContainer>
            <SliderWrapper
              $slideAmount={transformNumber}
              $isTransitioning={isTransitioning}
            >
              {similarListings.map((listing, index) => (
                <Card ref={index === 0 ? cardRef : null} key={Math.random()}>
                  <Link
                    style={{ textDecoration: "none" }}
                    onClick={(event) => event.stopPropagation()}
                    to={`/listing/${listing.id}`}
                  >
                    <DealType>
                      {listing.is_rental === 0 ? "იყიდება" : "ქირავდება"}
                    </DealType>
                    <CardImg src={listing.image} />
                    <CardBody>
                      <Price>{listing.price} ₾</Price>
                      <Address>
                        <img src="/images/location.png" alt="location" />
                        {`${listing.city.name}, ${listing.address}`}
                      </Address>
                      <IconsContainer>
                        <SingleIconContainer>
                          <img src="/images/bed.png" alt="bedrooms" />
                          <IconText>{listing.bedrooms}</IconText>
                        </SingleIconContainer>
                        <SingleIconContainer>
                          <img src="/images/area.png" alt="area" />
                          <IconText>
                            {listing.area} მ<sup>2</sup>
                          </IconText>
                        </SingleIconContainer>
                        <SingleIconContainer>
                          <img src="/images/stake.png" alt="zipcode" />
                          <IconText>{listing.zip_code}</IconText>
                        </SingleIconContainer>
                      </IconsContainer>
                    </CardBody>
                  </Link>
                </Card>
              ))}
            </SliderWrapper>
          </StyledSliderContainer>
          <RightArrow src="/images/arrow-right.png" onClick={slideRight} />
        </SliderContainer>
      ) : (
        <SliderNoInfoSpan>
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </SliderNoInfoSpan>
      )}
    </SliderSection>
  );
};

const SliderSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5.2rem;
  margin-top: 15.9rem;
  width: 100%;
  position: relative;
`;

const SliderTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 500;
  color: #021526;
  text-align: center;
`;

const SliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledSliderContainer = styled.div`
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
`;

const SliderWrapper = styled.div<{
  $slideAmount: number;
  $isTransitioning: boolean;
}>`
  display: flex;
  gap: 2rem;
  transform: ${({ $slideAmount }) => `translateX(-${$slideAmount}px)`};
  transition: ${({ $isTransitioning }) =>
    $isTransitioning
      ? "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)"
      : "none"};
`;

const LeftArrow = styled.img`
  position: absolute;
  top: 50%;
  left: -4rem;
  transform: translateY(-50%);
  cursor: pointer;
`;

const RightArrow = styled.img`
  position: absolute;
  top: 50%;
  right: -4rem;
  transform: translateY(-50%);
  cursor: pointer;
`;

const SliderNoInfoSpan = styled(NoInfoSpan)`
  align-self: center;
`;

export default Slider;
