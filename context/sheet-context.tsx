"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

interface SheetContextProps {
  isSheetOpen: boolean;
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
}

export const SheetContext = createContext<SheetContextProps>({
  isSheetOpen: false,
  setIsSheetOpen: () => {},
});

export const SheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <SheetContext.Provider value={{ isSheetOpen, setIsSheetOpen }}>
      {children}
    </SheetContext.Provider>
  );
};
