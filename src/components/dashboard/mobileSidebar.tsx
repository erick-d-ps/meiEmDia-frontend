"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  ScrollText,
  BoltIcon,
  LogOut,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetFooter,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import { MonthSelector } from "@/components/month-selector";

interface SidbarProps {
  userName: string;
}

const menuItens = [
  {
    title: "Inicio",
    href: "/dashboard",
    icon: Home,
  },

  {
    title: "Histórico de meses",
    href: "/dashboard/monthlyHistory",
    icon: Calendar,
  },

  {
    title: "Relatórios",
    href: "/dashboard/reports",
    icon: ScrollText,
  },
];

export function MobileSidebar({ userName }: SidbarProps) {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="z-50 shrink-0 lg:hidden">
      <header className="bg-surface border-b border-border">
        <div className="grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 sm:px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size={"icon"}>
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[min(18rem,85vw)] border-borderGren bg-surface"
            >
              <SheetHeader className="border-b border-borderGren p-6">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4">
                {menuItens.map((menu) => {
                  const Icon = menu.icon;
                  const isActive = pathName === menu.href;
                  return (
                    <Link
                      href={menu.href}
                      key={menu.title}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-200 hover:text-black",
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      {menu.title}
                    </Link>
                  );
                })}
                
              </nav>
              <SheetFooter className="mt-auto border-t border-border p-4">
                <footer className="w-full">
                  <div>
                    <Link
                      href={"/dashboard/settings"}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 text-gray-700 hover:bg-gray-200 hover:text-black",
                      )}
                    >
                      <BoltIcon />
                      Configuração
                    </Link>
                  </div>
                  <form action={logoutAction}>
                    <Button
                      type="submit"
                      variant="link"
                      className="w-full justify-start text-danger"
                    >
                      <LogOut />
                      Sair
                    </Button>
                  </form>
                </footer>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <MonthSelector
            date={selectedDate}
            className="min-w-0 justify-center px-1 text-xs sm:px-3 sm:text-sm"
            onChange={(date) => {
              setSelectedDate(date);
            }}
          />

          <div className="min-w-0 max-w-28 text-right sm:max-w-48">
            <p className="truncate text-xs font-medium sm:text-sm">Olá, {userName}</p>
          </div>
        </div>
      </header>
    </div>
  );
}
