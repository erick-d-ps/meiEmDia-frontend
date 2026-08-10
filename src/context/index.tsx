"use client";

import { createContext, ReactNode, useState } from "react";

interface DasboardProviderProps {
  children: ReactNode;
}

interface DashboardContextProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const DashboardContext = createContext({} as DashboardContextProps);

 function DashboardProvider({ children }: DasboardProviderProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log("selectedDate", selectedDate);

  return (
    <DashboardContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
