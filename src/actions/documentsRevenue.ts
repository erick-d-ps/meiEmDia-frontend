"use server";

import { apiClient } from "@/lib/api";
import { RevenueType } from "@/lib/types";
import { getToken } from "@/lib/auth";

export async function CreateRevenue(formdata: FormData) {
  try {
    const token = await getToken();
    const amount = Number(String(formdata.get("amount")).replace(",", ".")); 
    const type = formdata.get("type") as string;
    const date = formdata.get("date") as string;
    const note = (formdata.get("note") ?? "") as string;

    if(!amount || !type || !date){
       return {
        success: false,
        message: "Preencha todos os campos obrigatórios."
       } 
    }

    const data = {
      amount: amount,
      type: type,
      date: date,
      note: note,
    };

    await apiClient<RevenueType>("/revenue", {
      method: "POST",
      body: JSON.stringify(data),
      token: token,
    });

    return { success: true, message: "" };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

export async function SearchHistory(month: number, year: number) {
  try {
    const token = await getToken();
    const response = await apiClient<RevenueType[]>(
       `/revenues?month=${month}&year=${year}`,
      {
      method: "GET",
      token: token,
    });
    
    return { success: true, data: response };

  }catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}
