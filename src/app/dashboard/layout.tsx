import { AuthenticatedUser } from "@/lib/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;  
}){
   const user = await AuthenticatedUser();
   //console.log("User logado" ,user)

   return(
    <div>
       <main>
        {children}
       </main> 
    </div>
   )
}