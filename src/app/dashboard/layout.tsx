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
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      {/*Desctop*/}
      <div className="flex flex-1 flex-col ">
        {/*Mobile sidebar*/}
        <MobileSidebar userName={user.name} />
        <main className="flex-1 overflow-y-auto">
          <Header userName={user.name} />
          <div className="container max-w-full px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
