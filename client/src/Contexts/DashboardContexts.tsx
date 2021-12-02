import { useState, useContext, createContext, PropsWithChildren } from "react";

type toggleLayoutDelegate = (newType: string) => void;

export const DashboardLayoutContext = createContext<string | null>(null);
export const DashboardLayoutUpdateContext =
  createContext<toggleLayoutDelegate | null>(null);

export function useDashboardLayout() {
  return useContext(DashboardLayoutContext);
}

export function useDashboardLayoutUpdateContext() {
  return useContext(DashboardLayoutUpdateContext);
}

export function DashboardLayoutProvider(props: PropsWithChildren<{}>) {
  const [layoutType, setLayoutType] = useState("Matrix");

  const toggleLayout: toggleLayoutDelegate = (newType: string) => {
    setLayoutType(newType);
  };

  return (
    <DashboardLayoutContext.Provider value={layoutType}>
      <DashboardLayoutUpdateContext.Provider value={toggleLayout}>
        {props.children}
      </DashboardLayoutUpdateContext.Provider>
    </DashboardLayoutContext.Provider>
  );
}
