"use server";

import { apiClient } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { AuthUser } from "@/lib/types"

export async function registerAction(
    prevState: { success: boolean; error: string; redirecTo?: string } | null,
    formData: FormData
) {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string

    const data ={
      email: email,
      name: name,
      password: password  
    }

   const response = await apiClient("/user", {
      method: "POST",
      body: JSON.stringify(data)  
    })

    console.log(response)

    return {success: true, error: "", redirectTo: "/login"}

  } catch (err) {
    if(err instanceof Error){
       return{ success: false, error: err.message }; 
    }
    return{ success: false, error: "Erro ao criar a conta!"}
  }
}

export async function loginAction(
   prevState: { success: boolean; error: string; redirecTo?: string } | null,
    formData: FormData
){
  try{
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const data = {
      email: email,
      password: password
    }

    const auth = apiClient<AuthUser>("/session", {
      method: "POST",
      body: JSON.stringify(data)
    })

    const authData = await auth

    await setToken(authData.token)
  }catch(err){

  }
}
