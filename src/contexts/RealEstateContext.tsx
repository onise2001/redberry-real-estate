import React, { createContext, ReactNode, useContext, useState } from "react";

interface IRealEstateContext {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const RealEsateContex = createContext<IRealEstateContext>({
  active: false,
  setActive: () => {},
});
export default function RealEstateContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <RealEsateContex.Provider value={{ active, setActive }}>
      {children}
    </RealEsateContex.Provider>
  );
}

export const useRealEstateContext = () => {
  const context = useContext(RealEsateContex);

  return context;
};
