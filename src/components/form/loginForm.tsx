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

export function FormLogin() {
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
          <CardTitle>Acesse sua conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-2 mb-4">
              <Label>Email</Label>
              <Input
                className="border border-border "
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
                id="password"
                type="password"
                placeholder="*******"
                required
              />
            </div>
            <div>
              <Button type="submit" className="flex w-full ">
                Entrar
              </Button>
            </div>
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
