"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthSelectorProps {
  date: Date;
  onChange: (date: Date) => void;
  className?: string;
}

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const years = Array.from(
  { length: 11 },
  (_, index) => 2020 + index
);

export function MonthSelector({
  date,
  onChange,
  className,
}: MonthSelectorProps) {
  const [open, setOpen] = useState(false);

  function handleMonthChange(month: string) {
    const newDate = new Date(date);
    newDate.setMonth(Number(month));

    onChange(newDate);
  }

  function handleYearChange(year: string) {
    const newDate = new Date(date);
    newDate.setFullYear(Number(year));

    onChange(newDate);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex max-w-full min-w-0 items-center gap-2 rounded-md px-3 text-sm font-semibold",
            className
          )}
        >
          <span className="truncate">
            {format(date, "MMMM / yyyy", { locale: ptBR })}
          </span>

          <CalendarIcon className="h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-70 bg-surface p-4">
        <div className="flex gap-2">
          <Select
            value={String(date.getMonth())}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="bg-surface">
              {months.map((month, index) => (
                <SelectItem key={month} value={String(index)}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={String(date.getFullYear())}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-25">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="bg-surface">
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}