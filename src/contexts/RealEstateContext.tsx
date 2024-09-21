import React, { createContext, ReactNode, useContext, useState } from "react";

interface IRealEstateContext {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  fetchRegions: () => Promise<Region[]>;
}
const RealEsateContex = createContext<IRealEstateContext>({
  active: false,
  setActive: () => {},
  fetchRegions: async () => [] as Region[],
});
export default function RealEstateContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [active, setActive] = useState<boolean>(false);

  const fetchRegions = async () => {
    const response = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/regions"
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Something went wrong while fetching Regions");
    }
  };

  return (
    <RealEsateContex.Provider value={{ active, setActive, fetchRegions }}>
      {children}
    </RealEsateContex.Provider>
  );
}

export const useRealEstateContext = () => {
  const context = useContext(RealEsateContex);
  return context;
};
