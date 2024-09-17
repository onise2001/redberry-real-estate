declare module "../styled-components/GlobalStyles" {
  import { createGlobalStyle } from "styled-components";
  const GlobalStyles: ReturnType<typeof createGlobalStyle>;
  export default GlobalStyles;
}

interface Region {
  id: number;
  name: string;
}

interface AllFilters {
  region: Region[];
  area: { min: string; max: string };
  price: { min: string; max: string };
  bedrooms: string;
}

interface Agent {
  id: number;
  name: string;
  surname: string;
  avatar: string;
}

interface City {
  id: number;
  name: string;
  region_id: number;
}

type SelectOption = {
  value: number;
  label: string;
};

interface CityAndRegion {
  id: number;
  name: string;
  region_id: number;
  region: Region;
}

interface Listing {
  id: number;
  address: string;
  description: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  image: string;
  city_id: number;
  city: CityAndRegion;
  agent_id: number;
  agent: Agent;
}
