import { useState, useContext, createContext, PropsWithChildren } from "react";
import { IRepo } from "../Interfaces/IRepo";

type toggleLayoutDelegate = (newType: string) => void;
type toggleModalDelegate = (toggle: boolean | IRepo) => void;

const DashboardLayoutContext = createContext<string | null>(null);
const DashboardLayoutUpdateContext = createContext<toggleLayoutDelegate | null>(
  null
);
const AddRepoContext = createContext<boolean>(false);
const ToggleAddRepoContext = createContext<toggleModalDelegate>(() => {});
const InfoRepoContext = createContext<IRepo | null>(null);
const ToggleInfoRepoContext = createContext<toggleModalDelegate>(() => {});
export function useDashboardLayout() {
  return useContext(DashboardLayoutContext);
}

export function useDashboardLayoutUpdateContext() {
  return useContext(DashboardLayoutUpdateContext);
}

export function useAddRepoContext() {
  return useContext(AddRepoContext);
}

export function useToggleAddRepoContext() {
  return useContext(ToggleAddRepoContext);
}

export function useInfoRepoContext() {
  return useContext(InfoRepoContext);
}

export function useToggleInfoRepoContext() {
  return useContext(ToggleInfoRepoContext);
}

export function DashboardLayoutProvider(props: PropsWithChildren<{}>) {
  const [layoutType, setLayoutType] = useState<string>("Matrix");
  const [addRepo, setAddRepo] = useState<boolean>(false);
  const [infoRepo, setInfoRepo] = useState<IRepo | null>(null);

  const toggleLayout: toggleLayoutDelegate = (newType: string) => {
    setLayoutType(newType);
  };

  const toggleAddRepo: toggleModalDelegate = (toggle: boolean | IRepo) => {
    setAddRepo(toggle as boolean);
  };

  const toggleInfoRepo: toggleModalDelegate = (toggle?: boolean | IRepo) => {
    toggle ? setInfoRepo(toggle as IRepo) : setInfoRepo(null);
  };

  return (
    <DashboardLayoutContext.Provider value={layoutType}>
      <DashboardLayoutUpdateContext.Provider value={toggleLayout}>
        <AddRepoContext.Provider value={addRepo}>
          <ToggleAddRepoContext.Provider value={toggleAddRepo}>
            <InfoRepoContext.Provider value={infoRepo}>
              <ToggleInfoRepoContext.Provider value={toggleInfoRepo}>
                {props.children}
              </ToggleInfoRepoContext.Provider>
            </InfoRepoContext.Provider>
          </ToggleAddRepoContext.Provider>
        </AddRepoContext.Provider>
      </DashboardLayoutUpdateContext.Provider>
    </DashboardLayoutContext.Provider>
  );
}
