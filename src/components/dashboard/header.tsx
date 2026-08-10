"use client";

import { useContext } from "react";
import { MonthSelector } from "@/components/month-selector";
import { DashboardContext } from "@/context";

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  const { selectedDate, setSelectedDate } = useContext(DashboardContext);

  return (
    <header className="hidden h-18 shrink-0 border-b border-border bg-background lg:flex">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6">
        <MonthSelector
          date={selectedDate}
          onChange={setSelectedDate}
        />
        <div>
          <p>Olá, {userName}</p> 
        </div>
      </div>
    </header>
  );
}
