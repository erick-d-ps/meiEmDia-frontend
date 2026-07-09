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
  <main className="min-h-screen bg-background lg:flex">
    <Sidebar />

    <div className="flex min-h-screen flex-1 flex-col">
      <MobileSidebar userName={user.name} />
      <Header userName={user.name} />

      <div className="flex-1 px-4 py-4 lg:px-6 lg:py-6">
        {children}
      </div>
    </div>
  </main>
);
}
