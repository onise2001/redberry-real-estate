import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMask } from "@react-input/mask";

interface IFiltersProps {
  setAllFilters: React.Dispatch<React.SetStateAction<AllFilters>>;
  allFilters: AllFilters;
}
const Filters: React.FC<IFiltersProps> = ({ setAllFilters, allFilters }) => {
  const filterRef = useMask({
    mask: "______________",
    replacement: { _: /[0-9]/ },
  });

  const bedroomsRef = useMask({
    mask: "__",
    replacement: { _: /[0-9]/ },
  });

  const filters = [
    "რეგიონი",
    "საფასო კატეგორია",
    "ფართობი",
    "საძინებლების რაოდენობა",
  ];
  const prices: string[] = [
    "50,000",
    "100,000",
    "150,000",
    "200,000",
    "300,000",
  ];
  const areas: string[] = ["20", "50", "100", "200", "300"];
  const [filterToShow, setFilterToShow] = useState<string>("");

  const [filterRegions, setFilterRegions] = useState<Region[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });

  const [areaRange, setAreaRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });

  const [bedroomsNum, setBedroomsNum] = useState<string>("");
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

    const filters = localStorage.getItem("filters");
    if (filters) {
      const savedFilters: AllFilters = JSON.parse(filters);
      setAllFilters({ ...savedFilters });
    }
    console.log("Remounted");
  }, []);

  const filterChange = (filter: number) => {
    if (filterToShow == filters[filter] || !filters[filter]) {
      setFilterToShow("");
    } else if (filters[filter]) {
      setFilterToShow(filters[filter]);
    }
  };

  //console.log(allFilters);
  return (
    <StyledFiltersWrapper>
      <SingleFilterWrapper $active={filterToShow == filters[0]}>
        <FilterText
          onClick={() => {
            filterChange(0);
          }}
        >
          რეგიონი
        </FilterText>
        <ArrowIcon src="/images/arrow.png" />
        <RegionsPopup $active={filterToShow == filters[0]}>
          <FilterTitle>რეგიონის მიხედვით</FilterTitle>
          <RegionsContainer>
            {regions?.map((item) => {
              return (
                <SingleRegionContainer key={item.id}>
                  <input
                    type="checkbox"
                    onChange={(event) => {
                      if (
                        event.target.checked &&
                        !filterRegions.some((region) => region.id === item.id)
                      ) {
                        setFilterRegions([...filterRegions, item]);
                      }
                    }}
                  />
                  <RegionName>{item.name}</RegionName>
                </SingleRegionContainer>
              );
            })}
          </RegionsContainer>
          <ChooseButton
            onClick={() => {
              setAllFilters((prev) => {
                const updatedState = { ...prev, region: filterRegions };
                localStorage.setItem("filters", JSON.stringify(updatedState));
                setFilterToShow("");
                return updatedState;
              });
            }}
          >
            არჩევა
          </ChooseButton>
        </RegionsPopup>
      </SingleFilterWrapper>
      <SingleFilterWrapper $active={filterToShow === filters[1]}>
        <FilterText
          onClick={() => {
            filterChange(1);
          }}
        >
          საფასო კატეგორია
        </FilterText>
        <ArrowIcon src="/images/arrow.png" />
        <PriceAndAreaPopup $active={filterToShow === filters[1]}>
          <FilterTitle>ფასის მიხედვით</FilterTitle>
          <InputWrapper>
            <SingleInputWrapper>
              <StyledInput
                ref={filterRef}
                placeholder="დან"
                onChange={(event) => {
                  setPriceRange((prev) => ({
                    ...prev,
                    min: event?.target.value,
                  }));
                }}
                value={priceRange.min}
              />
              <InputText>₾</InputText>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledInput
                ref={filterRef}
                placeholder="მდე"
                onChange={(event) => {
                  setPriceRange((prev) => ({
                    ...prev,
                    max: event?.target.value,
                  }));
                }}
                value={priceRange.max}
              />
              <InputText>₾</InputText>
            </SingleInputWrapper>
          </InputWrapper>
          <PricesAndAreaWrapper>
            <PriceAndAreaColumn>
              <PriceTitle>მინ. ფასი</PriceTitle>
              {prices.map((item) => {
                return (
                  <StyledLi
                    key={item}
                    onClick={() => {
                      setPriceRange((prev) => ({
                        ...prev,
                        min: item.replace(",", ""),
                      }));
                    }}
                  >{`${item} ₾`}</StyledLi>
                );
              })}
            </PriceAndAreaColumn>
            <PriceAndAreaColumn>
              <PriceTitle>მაქს. ფასი</PriceTitle>
              {prices.map((item) => {
                return (
                  <StyledLi
                    key={item}
                    onClick={() => {
                      setPriceRange((prev) => ({
                        ...prev,
                        max: item.replace(",", ""),
                      }));
                    }}
                  >{`${item} ₾`}</StyledLi>
                );
              })}
            </PriceAndAreaColumn>
          </PricesAndAreaWrapper>
          <ChooseButton
            onClick={() => {
              setAllFilters((prev) => {
                const updatedState = { ...prev, price: priceRange };
                localStorage.setItem("filters", JSON.stringify(updatedState));
                setFilterToShow("");
                return updatedState;
              });
            }}
          >
            არჩევა
          </ChooseButton>
        </PriceAndAreaPopup>
      </SingleFilterWrapper>
      <SingleFilterWrapper $active={filterToShow === filters[2]}>
        <FilterText
          onClick={() => {
            filterChange(2);
          }}
        >
          ფართობი
        </FilterText>
        <ArrowIcon src="/images/arrow.png" />
        <PriceAndAreaPopup $active={filterToShow === filters[2]}>
          <FilterTitle>ფართობის მიხედვით</FilterTitle>
          <InputWrapper>
            <SingleInputWrapper>
              <StyledInput
                placeholder="დან"
                onChange={(event) => {
                  setAreaRange((prev) => ({
                    ...prev,
                    min: event?.target.value,
                  }));
                }}
                value={areaRange.min}
              />
              <InputText>
                მ<sup>2</sup>
              </InputText>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledInput
                placeholder="მდე"
                onChange={(event) => {
                  setAreaRange((prev) => ({
                    ...prev,
                    max: event?.target.value,
                  }));
                }}
                value={areaRange.max}
              />
              <InputText>
                მ<sup>2</sup>
              </InputText>
            </SingleInputWrapper>
          </InputWrapper>
          <PricesAndAreaWrapper>
            <PriceAndAreaColumn>
              <PriceTitle>
                მინ. მ<sup>2</sup>
              </PriceTitle>
              {areas.map((item) => {
                return (
                  <StyledLi
                    key={Math.random()}
                    onClick={() => {
                      setAreaRange((prev) => ({
                        ...prev,
                        min: item,
                      }));
                    }}
                  >
                    {`${item} `}მ<sup>2</sup>
                  </StyledLi>
                );
              })}
            </PriceAndAreaColumn>
            <PriceAndAreaColumn>
              <PriceTitle>
                მაქს. მ<sup>2</sup>
              </PriceTitle>
              {areas.map((item) => {
                return (
                  <StyledLi
                    key={Math.random() * 2}
                    onClick={() => {
                      setAreaRange((prev) => ({
                        ...prev,
                        max: item,
                      }));
                    }}
                  >
                    {`${item} `}მ<sup>2</sup>
                  </StyledLi>
                );
              })}
            </PriceAndAreaColumn>
          </PricesAndAreaWrapper>
          <ChooseButton
            onClick={() => {
              setAllFilters((prev) => {
                const updatedState = { ...prev, area: areaRange };
                localStorage.setItem("filters", JSON.stringify(updatedState));
                setFilterToShow("");
                return updatedState;
              });
            }}
          >
            არჩევა
          </ChooseButton>
        </PriceAndAreaPopup>
      </SingleFilterWrapper>
      <SingleFilterWrapper $active={filterToShow === filters[3]}>
        <FilterTitle
          onClick={() => {
            filterChange(3);
          }}
        >
          საძინებლების რაოდენობა
        </FilterTitle>
        <ArrowIcon src="/images/arrow.png" />
        <BedroomPopup $active={filterToShow === filters[3]}>
          <FilterTitle>საძინებლების რაოდენობა</FilterTitle>
          <BedroomInput
            ref={bedroomsRef}
            placeholder="0"
            onChange={(event) => {
              setBedroomsNum(event.target.value);
            }}
            value={bedroomsNum}
          />
          <ChooseButton
            onClick={() => {
              setAllFilters((prev) => {
                const updatedState = { ...prev, bedrooms: bedroomsNum };
                localStorage.setItem("filters", JSON.stringify(updatedState));
                setFilterToShow("");
                return updatedState;
              });
            }}
          >
            არჩევა
          </ChooseButton>
        </BedroomPopup>
      </SingleFilterWrapper>
    </StyledFiltersWrapper>
  );
};

const StyledFiltersWrapper = styled.div`
  border: solid 1px #dbdbdb;
  border-radius: 10px;
  padding: 0.6rem;
  display: flex;
  gap: 2.4rem;
`;

const SingleFilterWrapper = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: relative;
  padding: 0.8rem 1.7rem;
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    `
    background-color:#f3f3f3;
    border-radius:6px;
  `}
`;

const FilterText = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: #021526;
`;

const ArrowIcon = styled.img``;

const FilterTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
  color: #021526;
`;

const RegionsPopup = styled.div<{ $active: boolean }>`
  display: ${(props) => (props.$active ? "flex" : "none")};

  position: absolute;
  top: 5.2rem;
  left: -0.6rem;
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
  width: 100%;
  display: grid;
  grid: repeat(4, 1fr) / repeat(3, 1fr);

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
  min-width: 10rem;
`;

const RegionName = styled.span`
  font-size: 1.4rem;
  color: #021526;
`;

const ChooseButton = styled.button`
  all: unset;
  padding: 0.8rem 1.4rem;
  font-size: 1.4rem;
  align-self: flex-end;
  font-weight: 500;
  text-align: center;
  background-color: #f93b1d;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
`;

const PriceAndAreaPopup = styled.div<{ $active: boolean }>`
  display: ${({ $active }) => ($active ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
  width: 100%;
  width: 38.2rem;
  padding: 2.4rem;
  position: absolute;
  top: 5.2rem;
  background-color: #fff;
  z-index: 100;
  box-shadow: 5px 5px 12px 0 rgba(2, 21, 38, 0.08);
  border: solid 1px #dbdbdb;
  border-radius: 10px;
`;

const StyledInput = styled.input`
  outline: none;
  width: 15.5rem;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.4rem;
  color: rgb(2, 21, 38);
  border: solid 1px #808a93;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SingleInputWrapper = styled.div`
  position: relative;
`;

const InputIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
`;

const InputText = styled.span`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #2d3648;
`;

const PriceTitle = styled(FilterTitle)`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
`;

const PricesAndAreaWrapper = styled.div`
  width: 100%;
  padding-right: 8.2rem;
  display: flex;
  justify-content: space-between;
`;

const PriceAndAreaColumn = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledLi = styled.li`
  font-size: 1.4rem;
  color: #2d3648;
`;

const BedroomPopup = styled.div<{ $active: boolean }>`
  display: ${({ $active }) => ($active ? "flex" : "none")};
  position: absolute;
  top: 5.2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
  z-index: 100;
  background-color: #fff;
  padding: 2.4rem;
`;

const BedroomInput = styled(StyledInput)`
  text-align: center;
  padding: 1rem;
  margin-bottom: 0.8rem;
  max-width: 4.1rem;
`;

export default Filters;
