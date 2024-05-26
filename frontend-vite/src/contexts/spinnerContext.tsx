import { ReactNode, createContext, useContext, useState } from "react";

interface SpinnerData {
  isActive: boolean;
}

const SpinnerContext = createContext<{
  spinner: SpinnerData | null;
  activate: React.Dispatch<React.SetStateAction<void>>;
  deactivate: React.Dispatch<React.SetStateAction<void>>;
}>({
  spinner: { isActive: false },
  activate: () => null,
  deactivate: () => null,
});

export const useSpinner = () => {
  return useContext(SpinnerContext);
};

export const SpinnerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [spinner, setSpinner] = useState<SpinnerData | null>(null);
  const activate = () => {
    setSpinner({ isActive: true });
  };

  const deactivate = () => {
    setSpinner({ isActive: false });
  };

  return (
    <SpinnerContext.Provider value={{ spinner, activate, deactivate }}>
      {children}
    </SpinnerContext.Provider>
  );
};
