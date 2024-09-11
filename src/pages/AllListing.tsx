import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const AllListing: React.FC = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      address: "შარტავას 2ა",
      zip_code: "0101",
      price: 100000,
      area: 100.5,
      bedrooms: 3,
      is_rental: 0,
      image: "/images/test-image.png",
      city_id: 1,
      city: {
        id: 1,
        name: "სოხუმი",
        region_id: 1,
        region: {
          id: 1,
          name: "აფხაზეთი",
        },
      },
    },
    {
      id: 2,
      address: "შარტავას 2ა",
      zip_code: "0101",
      price: 100000,
      area: 100.5,
      bedrooms: 3,
      is_rental: 0,
      image: "/images/test-image.png",
      city_id: 1,
      city: {
        id: 1,
        name: "სოხუმი",
        region_id: 1,
        region: {
          id: 1,
          name: "აფხაზეთი",
        },
      },
    },
    {
      id: 3,
      address: "შარტავას 2ა",
      zip_code: "0101",
      price: 100000,
      area: 100.5,
      bedrooms: 3,
      is_rental: 0,
      image: "/images/test-image.png",
      city_id: 1,
      city: {
        id: 1,
        name: "სოხუმი",
        region_id: 1,
        region: {
          id: 1,
          name: "აფხაზეთი",
        },
      },
    },
    {
      id: 4,
      address: "შარტავას 2ა",
      zip_code: "0101",
      price: 100000,
      area: 100.5,
      bedrooms: 3,
      is_rental: 0,
      image: "/images/test-image.png",
      city_id: 1,
      city: {
        id: 1,
        name: "სოხუმი",
        region_id: 1,
        region: {
          id: 1,
          name: "აფხაზეთი",
        },
      },
    },
    {
      id: 5,
      address: "შარტავას 2ა",
      zip_code: "0101",
      price: 100000,
      area: 100.5,
      bedrooms: 3,
      is_rental: 0,
      image: "/images/test-image.png",
      city_id: 1,
      city: {
        id: 1,
        name: "სოხუმი",
        region_id: 1,
        region: {
          id: 1,
          name: "აფხაზეთი",
        },
      },
    },
  ]);

  const filters = [
    "რეგიონი",
    "საფასო კატეგორია",
    "ფართობი",
    "საძინებლების რაოდენობა",
  ];
  const [filterToShow, setFilterToShow] = useState<string>("");

  const [regions, setRegions] = useState<Region[]>();

  useEffect(() => {
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
  }, []);
  console.log(filterToShow);
  return (
    <StyledSection>
      <StyledContainer>
        <StyledFiltersWrapper>
          <SingleFilterWrapper
            onClick={() => {
              if (filterToShow === filters[0]) {
                setFilterToShow("");
              } else {
                setFilterToShow(filters[0]);
              }
            }}
          >
            <FilterText>რეგიონი</FilterText>
            <ArrowIcon src="/images/arrow.png" />
            <RegionsPopup $active={filterToShow == filters[0]}>
              <FilterTitle>რეგიონის მიხედვით</FilterTitle>
              <RegionsContainer>
                {regions?.map((item) => {
                  return (
                    <SingleRegionContainer key={item.id}>
                      <input type="checkbox" />
                      {item.name}
                    </SingleRegionContainer>
                  );
                })}
              </RegionsContainer>
              <ChooseButton>არჩევა</ChooseButton>
            </RegionsPopup>
          </SingleFilterWrapper>
          <SingleFilterWrapper>
            <FilterText>საფასო კატეგორია</FilterText>
            <ArrowIcon src="/images/arrow.png" />
          </SingleFilterWrapper>
          <SingleFilterWrapper>
            <FilterText>ფართობი</FilterText>
            <ArrowIcon src="/images/arrow.png" />
          </SingleFilterWrapper>
          <SingleFilterWrapper>
            <FilterText>საძინებლები</FilterText>
            <ArrowIcon src="/images/arrow.png" />
          </SingleFilterWrapper>
        </StyledFiltersWrapper>
        <ButtonsContainer>
          <AddListingButton>
            <PlusIcon src="/images/white-cross.png" />
            ლისტინგის დამატება
          </AddListingButton>
          <AddAgentButton>
            <PlusIcon src="/images/orange-cross.png" />
            აგენტის დამატება
          </AddAgentButton>
        </ButtonsContainer>
      </StyledContainer>

      <ListingsContainer>
        {listings.map((item) => {
          return (
            <Card key={item.id}>
              <DealType>
                {item.is_rental === 0 ? "ქირავდება" : "იყიდება"}
              </DealType>
              <CardImg src={item.image} />
              <CardBody>
                <Price>{item.price} ₾</Price>
                <Address>
                  <img src="/images/location.png" />
                  {item.address}
                </Address>
                <IconsContainer>
                  <SingleIconContainer>
                    <img src="/images/bed.png" alt="" />
                    <IconText>{item.bedrooms}</IconText>
                  </SingleIconContainer>
                  <SingleIconContainer>
                    <img src="/images/area.png" alt="" />
                    <IconText>
                      {item.area}მ<sup>2</sup>
                    </IconText>
                  </SingleIconContainer>
                  <SingleIconContainer>
                    <img src="/images/stake.png" alt="" />
                    <IconText>{item.zip_code}</IconText>
                  </SingleIconContainer>
                </IconsContainer>
              </CardBody>
            </Card>
          );
        })}
      </ListingsContainer>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  padding: 0 16.2rem;
`;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledFiltersWrapper = styled.div`
  border: solid 1px #dbdbdb;
  border-radius: 10px;
  padding: 1.4rem 2rem;
  display: flex;
  gap: 2.4rem;
`;

const SingleFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: relative;
`;

const FilterText = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: #021526;
`;

const ArrowIcon = styled.img``;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const AddListingButton = styled.button`
  all: unset;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  padding: 1.4rem 1.6rem;
  background-color: #f93b1d;
  color: #fff;
  border-radius: 10px;
`;

const AddAgentButton = styled.button`
  all: unset;
  border: solid 1px #f93b1d;
  border-radius: 10px;
  padding: 1.4rem 1.6rem;
  color: #f93b1d;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
`;

const PlusIcon = styled.img`
  margin-right: 0.6rem;
`;

const ListingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 7.7rem;
`;

const Card = styled.div`
  width: 38.4rem;
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

const FilterTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
  color: #021526;
`;

const RegionsPopup = styled.div<{ $active: boolean }>`
  display: ${(props) => (props.$active ? "flex" : "none")};

  position: absolute;
  top: 4.2rem;
  left: -2rem;
  padding: 2.4rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
  background-color: #fff;
  z-index: 100;
  width: 73rem;
  border-radius: 10px;
  box-shadow: 5px 5px 12px 0 rgba(2, 21, 38, 0.08);
  border: solid 1px #dbdbdb;
`;

const RegionsContainer = styled.div`
  display: flex;
  gap: 14rem;
  justify-content: space-between;
  row-gap: 1.6rem;
  flex-wrap: wrap;
  max-width: 100%;
  margin-bottom: 0.8rem;
`;

const SingleRegionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 12rem;
`;

const ChooseButton = styled(AddListingButton)`
  padding: 0.8rem 1.4rem;
  font-size: 1.4rem;
  align-self: flex-end;
`;

export default AllListing;
