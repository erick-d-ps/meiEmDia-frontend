"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

interface DashboardProviderProps {
  children: ReactNode;
}

interface DashboardContextProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  revenueRevision: number;
  refreshRevenues: () => void;
}

export const DashboardContext = createContext(
  {} as DashboardContextProps
);

function DashboardProvider({ children }: DashboardProviderProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [revenueRevision, setRevenueRevision] = useState(0);

  function refreshRevenues() {
    setRevenueRevision((revision) => revision + 1);
  }

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("SELECTED_DATE");

      if (saved) {
        setSelectedDate(new Date(saved));
      } else {
        setSelectedDate(new Date());
      }
    } catch {
      setSelectedDate(new Date());
    }
  }, []);

  useEffect(() => {
    if (!selectedDate) return;

    try {
      sessionStorage.setItem(
        "SELECTED_DATE",
        selectedDate.toISOString()
      );
    } catch {
      // ignore storage errors
    }
  }, [selectedDate]);

  return (
    <DashboardContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        revenueRevision,
        refreshRevenues,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;