import { getAccountant } from "@/actions/accountant";
import { FormAccountant } from "@/components/form/formAccountant";
import { getToken } from "@/lib/auth";
import { apiClient } from "@/lib/api";
import { Mei } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function Accountant() {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const [meiData, accountantData] = await Promise.all([
    apiClient<Mei | null>("/mei", {
      method: "GET",
      token,
      cache: "no-store",
    }),
    getAccountant(),
  ]);

  if (!meiData) {
    redirect("/dashboard/mei-data");
  }

  return <FormAccountant mei={meiData} initialAccountant={accountantData} />;
}
