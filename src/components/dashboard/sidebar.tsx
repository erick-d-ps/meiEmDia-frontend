"use client";

import { Home, Calendar, ScrollText, BoltIcon, LogOut } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo2.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";

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
  {
    title: "Configurações",
    href: "/dashboard/settings",
    icon: BoltIcon,
  }
];

export function Sidebar() {
  const pathName = usePathname();

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 border-r border-border bg-surface">
      <div className=" p-6">
        <Image
          alt="logo do app"
          src={logo}
          quality={75}
          priority={true}
          width={0}
          height={0}
        />
      </div>
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
              <Icon className="w-5 h-5" />
              {menu.title}
            </Link>
          );
        })}
        <footer className="absolute bottom-4">
          
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
      </nav>
    </aside>
  );
}
