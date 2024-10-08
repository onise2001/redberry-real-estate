import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMask } from "@react-input/mask";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Error } from "../my-styled-components/GlobalStyles";
import { useRealEstateContext } from "../contexts/RealEstateContext";

interface IFiltersProps {
  setAllFilters: React.Dispatch<React.SetStateAction<AllFilters>>;
  allFilters: AllFilters;
}
const Filters: React.FC<IFiltersProps> = ({ allFilters, setAllFilters }) => {
  const { fetchRegions } = useRealEstateContext();
  const bedroomRef = useMask({
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

  const [regions, setRegions] = useState<Region[]>();
  useEffect(() => {
    const getRegions = async () => {
      try {
        const data = await fetchRegions();
        setRegions(data);
      } catch (error) {
        const errorMessage =
          (error as Error).message || "An unknown error occurred.";
        alert(errorMessage);
      }
    };
    getRegions();
  }, []);

  const filterChange = (filter: number) => {
    if (filterToShow == filters[filter] || !filters[filter]) {
      setFilterToShow("");
    } else if (filters[filter]) {
      setFilterToShow(filters[filter]);
    }
  };

  const [bedroomsNum, setBedroomsNum] = useState<string>("");

  interface RangeInputs {
    min: string;
    max: string;
  }

  const rangeResolver = yup.object({
    min: yup.string().matches(/^\d+$/).required(),
    max: yup
      .string()
      .matches(/^\d+$/)
      .required()
      .test("is-greater", "", function (value) {
        const { min } = this.parent;
        return parseInt(value) >= parseInt(min);
      }),
  });

  const priceRange = useForm<RangeInputs>({
    resolver: yupResolver(rangeResolver),
    mode: "all",
  });

  const areaRange = useForm<RangeInputs>({
    resolver: yupResolver(rangeResolver),
    mode: "all",
  });

  const priceSubmit: SubmitHandler<RangeInputs> = (data) => {
    setAllFilters((prev) => {
      const updatedState = { ...prev, price: data };
      localStorage.setItem("filters", JSON.stringify(updatedState));
      setFilterToShow("");
      return updatedState;
    });
  };

  const areaSubmit: SubmitHandler<RangeInputs> = (data) => {
    setAllFilters((prev) => {
      const updatedState = { ...prev, area: data };
      localStorage.setItem("filters", JSON.stringify(updatedState));
      setFilterToShow("");
      return updatedState;
    });
  };

  useEffect(() => {
    setFilterRegions([...allFilters.region]);
    areaRange.setValue("min", allFilters.area.min);
    areaRange.setValue("max", allFilters.area.max);
    priceRange.setValue("min", allFilters.price.min);
    priceRange.setValue("max", allFilters.price.max);
    setBedroomsNum(allFilters.bedrooms);
  }, [allFilters]);

  const regionsRef = useRef<HTMLDivElement | null>(null);
  const pricePopupRef = useRef<HTMLFormElement | null>(null);
  const areaPopupRef = useRef<HTMLFormElement | null>(null);
  const bedroomPopRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      regionsRef.current &&
      !regionsRef.current.contains(event.target as Node) &&
      pricePopupRef.current &&
      !pricePopupRef.current.contains(event.target as Node) &&
      areaPopupRef.current &&
      !areaPopupRef.current.contains(event.target as Node) &&
      bedroomPopRef.current &&
      !bedroomPopRef.current.contains(event.target as Node)
    ) {
      setFilterToShow(""); // Close all popups
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <StyledFiltersWrapper>
      <SingleFilterWrapper
        $active={filterToShow == filters[0]}
        onClick={() => {
          filterChange(0);
        }}
      >
        <FilterText>რეგიონი</FilterText>
        <ArrowIcon
          $dropped={filterToShow == filters[0]}
          src="/images/arrow.png"
        />
        <RegionsPopup
          $active={filterToShow == filters[0]}
          onClick={(event) => event.stopPropagation()}
          ref={regionsRef}
        >
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
                      } else {
                        setFilterRegions(
                          filterRegions.filter(
                            (region) => region.id !== item.id
                          )
                        );
                      }
                    }}
                    checked={filterRegions.some(
                      (region) => region.id === item.id
                    )}
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
      <SingleFilterWrapper
        $active={filterToShow === filters[1]}
        onClick={() => {
          filterChange(1);
        }}
      >
        <FilterText>საფასო კატეგორია</FilterText>
        <ArrowIcon
          $dropped={filterToShow === filters[1]}
          src="/images/arrow.png"
        />
        <PriceAndAreaPopup
          ref={pricePopupRef}
          $active={filterToShow === filters[1]}
          onSubmit={priceRange.handleSubmit(priceSubmit)}
          onClick={(event) => event.stopPropagation()}
        >
          <FilterTitle>ფასის მიხედვით</FilterTitle>
          <InputWrapper>
            <SingleInputWrapper>
              <StyledInput {...priceRange.register("min")} placeholder="დან" />
              <InputText>₾</InputText>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledInput {...priceRange.register("max")} placeholder="მდე" />
              <InputText>₾</InputText>
            </SingleInputWrapper>
          </InputWrapper>
          {priceRange.formState.errors.min ||
          priceRange.formState.errors.max ? (
            <Error>ჩაწერეთ ვალიდური მონაცემები</Error>
          ) : null}
          <PricesAndAreaWrapper>
            <PriceAndAreaColumn>
              <PriceTitle>მინ. ფასი</PriceTitle>
              {prices.map((item) => {
                return (
                  <StyledLi
                    key={item}
                    onClick={() => {
                      priceRange.setValue("min", item.replace(",", ""));
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
                      priceRange.setValue("max", item.replace(",", ""));
                    }}
                  >{`${item} ₾`}</StyledLi>
                );
              })}
            </PriceAndAreaColumn>
          </PricesAndAreaWrapper>
          <ChooseButton type="submit">არჩევა</ChooseButton>
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
        <ArrowIcon
          $dropped={filterToShow === filters[2]}
          src="/images/arrow.png"
        />
        <PriceAndAreaPopup
          ref={areaPopupRef}
          $active={filterToShow === filters[2]}
          onSubmit={areaRange.handleSubmit(areaSubmit)}
        >
          <FilterTitle>ფართობის მიხედვით</FilterTitle>
          <InputWrapper>
            <SingleInputWrapper>
              <StyledInput placeholder="დან" {...areaRange.register("min")} />
              <InputText>
                მ<sup>2</sup>
              </InputText>
            </SingleInputWrapper>
            <SingleInputWrapper>
              <StyledInput placeholder="მდე" {...areaRange.register("max")} />
              <InputText>
                მ<sup>2</sup>
              </InputText>
            </SingleInputWrapper>
          </InputWrapper>
          {areaRange.formState.errors.min || areaRange.formState.errors.max ? (
            <Error>ჩაწერეთ ვალიდური მონაცემები</Error>
          ) : null}
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
                      areaRange.setValue("min", item.replace(",", ""));
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
                      areaRange.setValue("max", item.replace(",", ""));
                    }}
                  >
                    {`${item} `}მ<sup>2</sup>
                  </StyledLi>
                );
              })}
            </PriceAndAreaColumn>
          </PricesAndAreaWrapper>
          <ChooseButton type="submit">არჩევა</ChooseButton>
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
        <ArrowIcon
          $dropped={filterToShow == filters[3]}
          src="/images/arrow.png"
        />
        <BedroomPopup ref={bedroomPopRef} $active={filterToShow === filters[3]}>
          <FilterTitle>საძინებლების რაოდენობა</FilterTitle>
          <BedroomInput
            placeholder="0"
            ref={bedroomRef}
            value={bedroomsNum}
            onChange={(event) => setBedroomsNum(event?.target.value)}
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

  &:hover {
    background-color: #f3f3f3;
    border-radius: 6px;
  }

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

const ArrowIcon = styled.img<{ $dropped: boolean }>`
  transform: ${({ $dropped }) =>
    $dropped ? "rotate(180deg)" : "rotate(0deg)"};
`;

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

const PriceAndAreaPopup = styled.form<{ $active: boolean }>`
  display: ${({ $active }) => ($active ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-start;
  gap: 2.4rem;
  width: 100%;
  width: 38.2rem;
  padding: 2.4rem;
  position: absolute;
  top: 5.2rem;
  left: -0.3rem;
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
