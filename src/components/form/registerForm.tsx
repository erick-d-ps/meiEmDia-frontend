"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { registerAction } from "@/actions/auth";

export  function FormRegiste() {

const [ state, actionForm, isPending] = useActionState(registerAction, null)
const router = useRouter()

useEffect(() => {
  if(state?.success && state.redirectTo){
    router.replace(state.redirectTo)
  }
}, [state, router])

  return (
    <main className="flex w-full items-center justify-center flex-col px-4">
      <div className="max-w-3xl">
        <Image
          alt="logo do app"
          src={logo}
          quality={75}
          priority={true}
          width={0}
          height={0}
          className="sm:w-2xl mb-10"
        />
      </div>

      <Card
        className="w-full max-w-md mx-auto 
         border border-borderGren"
      >
        <CardHeader className="justify-center mt-4 mb-2">
          <CardTitle>Cadastre sua conta!</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={actionForm}>
            <div className="flex flex-col gap-2 mb-4">
              <Label>Nome completo</Label>
              <Input
                className="border border-border "
                name="name"
                id="name"
                type="text"
                placeholder="Nome do usuário..."
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <Label>Email</Label>
              <Input
                className="border border-border "
                name="email"
                id="email"
                type="email"
                placeholder="email@exemple.com..."
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
                {isPending ? "Criando conta..." : "Criar conta!"}
              </Button>
            </div>
          </form>
          <CardFooter className="flex flex-col gap-2 items-center justify-center mt-2 border-none ">
            <div>
              <Link className="font-bold text-text-blue text-base hover:text-borderGren" href={"/login"}>
                Faça logim!
              </Link>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </main>
  );
}
