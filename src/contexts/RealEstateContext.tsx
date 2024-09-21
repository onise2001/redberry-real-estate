import React, { createContext, ReactNode, useContext, useState } from "react";

interface IRealEstateContext {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  fetchRegions: () => Promise<Region[]>;
  agents: SelectOption[];
  setAgents: React.Dispatch<React.SetStateAction<SelectOption[]>>;
  newAgentId: number;
  setNewAgentId: React.Dispatch<React.SetStateAction<number>>;
}
const RealEsateContex = createContext<IRealEstateContext>({
  active: false,
  setActive: () => {},
  fetchRegions: async () => [] as Region[],
  agents: [],
  setAgents: () => [],
  newAgentId: 0,
  setNewAgentId: () => {},
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
  const [agents, setAgents] = useState<SelectOption[]>([
    {
      value: 0,
      label: "",
    },
  ]);

  const [newAgentId, setNewAgentId] = useState<number>(0);

  return (
    <RealEsateContex.Provider
      value={{
        active,
        setActive,
        fetchRegions,
        agents,
        setAgents,
        newAgentId,
        setNewAgentId,
      }}
    >
      {children}
    </RealEsateContex.Provider>
  );
}

export const useRealEstateContext = () => {
  const context = useContext(RealEsateContex);
  return context;
};
