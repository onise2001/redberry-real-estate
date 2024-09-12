import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Filters from "../components/Filters";
import AddAgent from "../components/AddAgent";
import { Link } from "react-router-dom";

const AllListing: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);

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
        region_id: 2,
        region: {
          id: 2,
          name: "აჭარა",
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
        region_id: 3,
        region: {
          id: 3,
          name: "გურია",
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
        region_id: 4,
        region: {
          id: 4,
          name: "თბილისი",
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
        region_id: 5,
        region: {
          id: 5,
          name: "იმერეთი",
        },
      },
    },
  ]);

  const [allFilters, setAllFilters] = useState<AllFilters>({
    region: [],
    area: { min: "", max: "" },
    price: { min: "", max: "" },
    bedrooms: "",
  });

  const regionIds = allFilters.region.map((item) => item.id);

  // useEffect(() => {
  //   // const filters = localStorage.getItem("filters");
  //   // if (filters) {
  //   //   const savedFilters: AllFilters = JSON.parse(filters);
  //   //   setAllFilters(...savedFilters);
  //   // }
  //   console.log("Remounted");
  // }, []);

  //console.log(allFilters);

  return (
    <StyledSection>
      <AddAgent active={active} setActive={setActive} />
      <StyledContainer>
        <Filters setAllFilters={setAllFilters} allFilters={allFilters} />
        <ButtonsContainer>
          <Link to="/add-listing">
            <AddListingButton>
              <PlusIcon src="/images/white-cross.png" />
              ლისტინგის დამატება
            </AddListingButton>
          </Link>

          <AddAgentButton
            onClick={() => {
              setActive(true);
            }}
          >
            <PlusIcon src="/images/orange-cross.png" />
            აგენტის დამატება
          </AddAgentButton>
        </ButtonsContainer>
      </StyledContainer>
      <FiltersContainer>
        {allFilters.region.map((item) => {
          return (
            <SingleFilterWrapper key={item.id}>
              <SingleFilterText>{item.name}</SingleFilterText>
              <CloseIcon
                src="/images/close.png"
                onClick={() => {
                  setAllFilters((prev) => ({
                    ...prev,
                    region: allFilters.region.filter(
                      (reg) => reg.id !== item.id
                    ),
                  }));
                }}
              />
            </SingleFilterWrapper>
          );
        })}

        {allFilters.area.min || allFilters.area.max ? (
          <SingleFilterWrapper>
            <SingleFilterText>
              {allFilters.area.min}მ<sup>2</sup> - {allFilters.area.max}მ
              <sup>2</sup>{" "}
            </SingleFilterText>
            <CloseIcon
              src="/images/close.png"
              onClick={() => {
                setAllFilters((prev) => ({
                  ...prev,
                  area: { min: "", max: "" },
                }));
              }}
            />
          </SingleFilterWrapper>
        ) : null}

        {allFilters.price.min || allFilters.price.max ? (
          <SingleFilterWrapper>
            <SingleFilterText>
              {allFilters.price.min}₾ - {allFilters.price.max}₾{" "}
            </SingleFilterText>
            <CloseIcon
              src="/images/close.png"
              onClick={() => {
                setAllFilters((prev) => ({
                  ...prev,
                  price: { min: "", max: "" },
                }));
              }}
            />
          </SingleFilterWrapper>
        ) : null}

        {allFilters.bedrooms ? (
          <SingleFilterWrapper>
            <SingleFilterText>{allFilters.bedrooms}</SingleFilterText>
            <CloseIcon
              src="/images/close.png"
              onClick={() => {
                setAllFilters((prev) => ({ ...prev, bedrooms: "" }));
              }}
            />
          </SingleFilterWrapper>
        ) : null}

        {allFilters.region.length > 0 ||
        allFilters.area.min ||
        allFilters.area.max ||
        allFilters.price.min ||
        allFilters.price.max ||
        allFilters.bedrooms ? (
          <Clear
            onClick={() => {
              setAllFilters({
                region: [],
                area: { min: "", max: "" },
                price: { min: "", max: "" },
                bedrooms: "",
              });
            }}
          >
            გასუფთავება
          </Clear>
        ) : null}
      </FiltersContainer>

      <ListingsContainer>
        {listings
          .filter((item) => {
            let filtered = true;
            if (allFilters.region.length > 0) {
              if (!regionIds.includes(item.city.region_id)) filtered = false;
            }
            if (allFilters.area.min && allFilters.area.max) {
              if (
                !(
                  item.area >= parseInt(allFilters.area.min) &&
                  item.area <= parseInt(allFilters.area.max)
                )
              ) {
                filtered = false;
              }
            }

            if (allFilters.price.min && allFilters.price.max) {
              if (
                !(
                  item.price >= parseInt(allFilters.price.min) &&
                  item.price <= parseInt(allFilters.price.max)
                )
              ) {
                filtered = false;
              }
            }

            if (allFilters.bedrooms) {
              if (!(item.bedrooms === parseInt(allFilters.bedrooms))) {
                filtered = false;
              }
            }

            return filtered;
          })
          .map((item) => {
            return (
              <Card key={item.id}>
                <DealType>
                  {item.is_rental === 0 ? "ქირავდება" : "იყიდება"}s
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
                        {item.area} მ<sup>2</sup>
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

const FiltersContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: flex-start;
  margin: 1.6rem 0 3.2rem;
`;

const SingleFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  border-radius: 43px;
  border: solid 1px #dbdbdb;
`;

const SingleFilterText = styled.span`
  font-size: 1.4rem;
  text-align: center;
  color: rgba(2, 21, 38, 0.8);
`;

const CloseIcon = styled.img``;

const Clear = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  color: #021526;
`;

export default AllListing;
