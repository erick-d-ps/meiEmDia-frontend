import { AuthenticatedUser } from "@/lib/auth";
import { Sidebar } from "./components/sidbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await AuthenticatedUser();
  //console.log("User logado" ,user)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar/>{/*Desctop*/}
      <div>
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-full px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
