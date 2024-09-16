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
