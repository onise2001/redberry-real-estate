import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Filters from "../components/Filters";
import AddAgent from "../components/AddAgent";
import { useNavigate } from "react-router-dom";
import { useRealEstateContext } from "../contexts/RealEstateContext";
import {
  OrangeButton,
  WhiteButton,
  NoInfoSpan,
  Card,
  CardBody,
  Price,
  IconsContainer,
  SingleIconContainer,
  Address,
  CardImg,
  IconText,
  DealType,
} from "../my-styled-components/GlobalStyles";

const AllListing: React.FC = () => {
  const navigate = useNavigate();
  //const [active, setActive] = useState<boolean>(false);
  const { active, setActive } = useRealEstateContext();

  const [listings, setListings] = useState<Listing[]>([]);

  const [allFilters, setAllFilters] = useState<AllFilters>({
    region: [],
    area: { min: "", max: "" },
    price: { min: "", max: "" },
    bedrooms: "",
  });

  const regionIds = allFilters.region.map((item) => item.id);

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
        setListings(data);
      }
    };
    fetchListings();
  }, []);

  const filterListings = () => {
    return listings.filter((item) => {
      let satisfiesFilter = false;

      if (
        (allFilters.region.length > 0 &&
          regionIds.includes(item.city.region_id)) ||
        (allFilters.area.min &&
          allFilters.area.max &&
          item.area >= parseInt(allFilters.area.min) &&
          item.area <= parseInt(allFilters.area.max)) ||
        (allFilters.price.min &&
          allFilters.price.max &&
          item.price >= parseInt(allFilters.price.min) &&
          item.price <= parseInt(allFilters.price.max)) ||
        (allFilters.bedrooms && item.bedrooms === parseInt(allFilters.bedrooms))
      ) {
        satisfiesFilter = true;
      }

      if (
        !(allFilters.region.length > 0) &&
        !allFilters.area.min &&
        !allFilters.area.max &&
        !allFilters.price.min &&
        !allFilters.price.max &&
        !allFilters.bedrooms
      ) {
        satisfiesFilter = true;
      }

      return satisfiesFilter;
    });
  };

  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <StyledSection>
      <AddAgent active={active} setActive={setActive} />
      <StyledContainer>
        <Filters setAllFilters={setAllFilters} allFilters={allFilters} />
        <ButtonsContainer>
          <OrangeButton
            onClick={() => {
              navigate("/add-listing");
            }}
          >
            <PlusIcon src="/images/white-cross.png" />
            ლისტინგის დამატება
          </OrangeButton>

          <WhiteButton
            onMouseEnter={() => {
              setIsHovering(true);
            }}
            onMouseLeave={() => {
              setIsHovering(false);
            }}
            onClick={() => {
              setActive(true);
            }}
          >
            <PlusIcon
              src={
                isHovering
                  ? "/images/white-cross.png"
                  : "/images/orange-cross.png"
              }
            />
            აგენტის დამატება
          </WhiteButton>
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
                  setAllFilters((prev) => {
                    const updatedState = {
                      ...prev,
                      region: allFilters.region.filter(
                        (reg) => reg.id !== item.id
                      ),
                    };
                    localStorage.setItem(
                      "filters",
                      JSON.stringify(updatedState)
                    );
                    return updatedState;
                  });
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
                setAllFilters((prev) => {
                  const updatedState = {
                    ...prev,
                    area: { min: "", max: "" },
                  };
                  localStorage.setItem("filters", JSON.stringify(updatedState));
                  return updatedState;
                });
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
                setAllFilters((prev) => {
                  const updatedState = {
                    ...prev,
                    price: { min: "", max: "" },
                  };
                  localStorage.setItem("filters", JSON.stringify(updatedState));
                  return updatedState;
                });
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
                setAllFilters((prev) => {
                  const updatedState = {
                    ...prev,
                    bedrooms: "",
                  };
                  localStorage.setItem("filters", JSON.stringify(updatedState));
                  return updatedState;
                });
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

              localStorage.removeItem("filters");
            }}
          >
            გასუფთავება
          </Clear>
        ) : null}
      </FiltersContainer>

      <ListingsContainer>
        {filterListings().length > 0 ? (
          filterListings().map((item) => {
            return (
              <Card
                key={item.id}
                onClick={() => {
                  navigate(`/listing/${item.id}`);
                }}
              >
                <DealType>
                  {item.is_rental === 0 ? "იყიდება" : "ქირავდება"}
                </DealType>
                <CardImg src={item.image} />
                <CardBody>
                  <Price>{item.price} ₾</Price>
                  <Address>
                    <img src="/images/location.png" />
                    {`${item.city.name}, ${item.address}`}
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
          })
        ) : (
          <NoInfoSpan>აღნიშნული მონაცემებით განცხადება არ იძებნება</NoInfoSpan>
        )}
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

const PlusIcon = styled.img`
  margin-right: 0.6rem;
`;

const ListingsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 10rem;
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
  margin-left: 0.8rem;
  color: #021526;
  cursor: pointer;
`;

export default AllListing;
