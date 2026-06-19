import { cookies } from "next/headers";

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