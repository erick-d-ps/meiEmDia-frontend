import { cookies } from "next/headers";
import { User } from "./types";
import { apiClient } from "./api";
import { redirect } from "next/navigation";

const COOKIE_NAME = "token_MeiEmDia";

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setToken(token: string) {
  const cookieStore = await cookies();
  const ONE_WEEK = 60 * 60 * 24 * 7;
  
  cookieStore.set(
    COOKIE_NAME,
    token,
    {
      httpOnly: true,
      maxAge: ONE_WEEK,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production" 
    }
  )
}

export async function removeToken(){
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_NAME)
}

export async function getUser(): Promise<User | null>{
   try{
      const token = await getToken()

      if(!token){
        return null
      }

      const user = await apiClient<User>("/me", {
        token: token
      })

      return user
   }catch(err){
     console.log(err)
     return null
   }
}

export async function AuthenticatedUser(){
   const user = await getUser();

   if(!user){
     redirect("/login")
   }

   return user;
}
