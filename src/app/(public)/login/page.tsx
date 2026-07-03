import { redirect } from "next/navigation";
import { FormLogin } from "@/components/form/loginForm";
import { getUser } from "@/lib/auth";

export default async function Login() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-background w-full min-h-screen flex items-center justify-center px-4 py-8">
      <FormLogin />
    </div>
  );
}
