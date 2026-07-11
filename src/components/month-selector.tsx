"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MonthSelectorProps {
  date: Date;
  onChange: (date: Date) => void;
  className?: string;
}

export function MonthSelector({
  date,
  onChange,
  className,
}: MonthSelectorProps) {
  const [open, setOpen] = useState(false);

  function handleSelect(selectedDate: Date | undefined) {
    if (!selectedDate) return;

    onChange(selectedDate);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex max-w-full min-w-0 items-center gap-2 rounded-md px-3 text-sm font-semibold",
            className,
          )}
        >
          <span className="truncate">{format(date, "MMMM / yyyy", { locale: ptBR })}</span>
          <CalendarIcon className="h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          locale={ptBR}
          captionLayout="dropdown"
          startMonth={new Date(2020, 0)}
          endMonth={new Date(2030, 11)}
        />
      </PopoverContent>
    </Popover>
  );
}
