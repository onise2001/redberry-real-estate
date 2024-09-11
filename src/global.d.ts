declare module "../styled-components/GlobalStyles" {
  import { createGlobalStyle } from "styled-components";
  const GlobalStyles: ReturnType<typeof createGlobalStyle>;
  export default GlobalStyles;
}

interface Region {
  id: number;
  name: string;
}
