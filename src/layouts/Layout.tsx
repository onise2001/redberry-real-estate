import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import GlobalStyles from "../my-styled-components/GlobalStyles";

export default function Layout() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Outlet />
    </>
  );
}
