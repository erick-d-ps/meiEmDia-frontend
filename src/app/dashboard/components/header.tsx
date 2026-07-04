"use client";

import { useState } from "react";
import { MonthSelector } from "@/components/month-selector";

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <header className="hidden lg:flex overflow-hidden bg-background border-b border-border">
      <div className="w-full max-w-7xl mx-auto h-18 px-4 flex justify-between items-center">
        <MonthSelector
          date={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
        />
        <div>
          <p>Olá, {userName}</p> 
        </div>
      </div>
    </header>
  );
}
