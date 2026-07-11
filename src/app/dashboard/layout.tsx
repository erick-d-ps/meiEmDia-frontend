import { AuthenticatedUser } from "@/lib/auth";
import { Sidebar } from "../../components/dashboard/sidebar";
import { MobileSidebar } from "../../components/dashboard/mobileSidebar";
import { Header } from "../../components/dashboard/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await AuthenticatedUser();
  //console.log("User logado" ,user)

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-background">
      <Sidebar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <MobileSidebar userName={user.name} />
        <Header userName={user.name} />

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5 lg:px-6 lg:py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
