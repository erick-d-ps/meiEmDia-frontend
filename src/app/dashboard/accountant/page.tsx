import { getAccountant } from "@/actions/accountant";
import { FormAccountant } from "@/components/form/formAccountant";
import { getToken } from "@/lib/auth";
import { apiClient } from "@/lib/api";
import { Mei } from "@/lib/types";

export default async function Accountant() {
  const token = await getToken();

  if (!token) {
    return null;
  }

  const [meiData, accountantData] = await Promise.all([
    apiClient<Mei>("/mei", {
      method: "GET",
      token,
      cache: "no-store",
    }),
    getAccountant(),
  ]);

  return <FormAccountant mei={meiData} initialAccountant={accountantData} />;
}
