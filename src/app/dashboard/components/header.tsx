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
    <header className="hidden lg:flex overflow-hidden bg-background">
      <div className="w-full h-18 border-b border-border px-8 flex justify-between items-center">
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
