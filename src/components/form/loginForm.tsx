"use client"

import { useActionState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import logo from "../../../public/logo2.png";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { loginAction } from "@/actions/auth"
import { useRouter } from "next/navigation";

export function FormLogin() {
  const router = useRouter();
  const [ state, actionLogin, isPending ] = useActionState(loginAction, null)

  useEffect(() => {
    if(state?.success && state.redirectTo){
      router.replace(state.redirectTo)
    }
  }, [state, router])

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="w-full max-w-xl px-4 sm:px-8">
        <Image
          alt="logo do app"
          src={logo}
          quality={75}
          priority={true}
          width={0}
          height={0}
          className="mb-6 h-auto w-full sm:mb-10"
        />
      </div>

      <Card
        className="w-full max-w-md mx-auto 
         border border-borderGren"
      >
        <CardHeader className="justify-center mt-4 mb-2">
          <CardTitle>Acesse sua conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={actionLogin}>
            <div className="flex flex-col gap-2 mb-4">
              <Label>Email</Label>
              <Input
                className="border border-border "
                name="email"
                id="email"
                type="email"
                placeholder="email@exemple.com"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <Label>Senha</Label>
              <Input
                className="border border-border "
                name="password"
                id="password"
                type="password"
                placeholder="*******"
                required
              />
            </div>
            <div>
              <Button type="submit" className="flex w-full ">
                {isPending ? "Entrando" : "Entrar"}
              </Button>
            </div>
            {state?.error &&(
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                {state.error}
              </div>
            )}
          </form>
          <CardFooter className="flex flex-col gap-2 items-center justify-center mt-2 border-none ">
            <div className="flex gap-1">
              <p className="font-semibold">Recuperar minha</p>
              <Link className="font-bold text-text-blue" href={""}>
                conta
              </Link>
            </div>

            <div>
              <p className="mb-4 text-base">
                Não tem uma conta?{" "}
                <Link className="font-bold text-text-blue hover:text-borderGren" href={"/register"}>
                  cadastre-se já
                </Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </main>
  );
}
