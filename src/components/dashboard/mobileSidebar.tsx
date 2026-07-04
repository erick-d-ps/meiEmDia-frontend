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
    <div className="lg:hidden">
      <header className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="flex h-16 items-center justify-between px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size={"icon"}>
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-70 bg-surface border-borderGren "
            >
              <SheetHeader className="border-b border-borderGren p-6">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="relative flex-1 p-4 space-y-4">
                {menuItens.map((menu) => {
                  const Icon = menu.icon;
                  const isActive = pathName === menu.href;
                  return (
                    <Link
                      href={menu.href}
                      key={menu.title}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-200 hover:text-black",
                      )}
                    >
                      <Icon className="w-5 h5" />
                      {menu.title}
                    </Link>
                  );
                })}
                
              </nav>
              <SheetFooter>
                <footer className="absolute bottom-4">
                  <div className="fex ">
                    <Link
                      href={"/dashboard/settings"}
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
            onChange={(date) => {
              setSelectedDate(date);
            }}
          />

          <div className="flex items-center justify-center">
            <p className="text-sm font-medium">Olá, {userName}</p>
          </div>
        </div>
      </header>
    </div>
  );
}
