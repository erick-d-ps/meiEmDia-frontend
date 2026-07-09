"use server";

import { apiClient } from "@/lib/api";
import { setToken, removeToken } from "@/lib/auth";
import { AuthUser } from "@/lib/types";
import { redirect } from "next/navigation";

export async function registerAction(
  prevState: { success: boolean; error: string; redirecTo?: string } | null,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;

    const data = {
      email: email,
      name: name,
      password: password,
    };

     await apiClient("/user", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return { success: true, error: "", redirectTo: "/login" };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "Erro ao criar a conta!" };
  }
}

export async function loginAction(
  prevState: { success: boolean; error: string; redirecTo?: string } | null,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const data = {
      email: email,
      password: password,
    };

    const auth = apiClient<AuthUser>("/session", {
      method: "POST",
      body: JSON.stringify(data),
    });

    
    const authData = await auth;
    
    console.log(authData.name);

    await setToken(authData.token);

    return { success: true, error: "", redirectTo: "/dashboard" };
  } catch (err) {
    if (err instanceof Error) {
      const error = JSON.parse(err.message);

      if (error.status === 401) {
        return {
          success: false,
          error: "Email ou senha inválidos",
        };
      }

      if (error.status === 400) {
        return {
          success: false,
          error: "Dados inválidos",
        };
      }
    }

    return {
      success: false,
      error: "Erro ao fazer login",
    };
  }
}

export async function logoutAction(){
  await removeToken();
  redirect("/login");
}
