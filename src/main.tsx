import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout.tsx";
import AllListing from "./pages/AllListing.tsx";
import AddListing from "./pages/AddListing.tsx";
import SingleListing from "./pages/SingleListing.tsx";
import RealEstateContextProvider from "./contexts/RealEstateContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllListing />,
      },
      {
        path: "/add-listing",
        element: <AddListing />,
      },
      {
        path: "/listing/:id",
        element: <SingleListing />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RealEstateContextProvider>
      <RouterProvider router={router} />
    </RealEstateContextProvider>
  </StrictMode>
);
