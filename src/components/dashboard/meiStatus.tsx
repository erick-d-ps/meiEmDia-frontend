import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../../public/logo2.png";
import Image from "next/image";

export function MeiStatus() {
  return (
    <div className="flex flex-col">
      <section className="flex min-h-32 w-full flex-col items-center justify-center rounded-md border border-border bg-bgGreen p-4 text-center">
        <div className=" flex items-center justify-center mb-4">
          <Image
            alt="logo do app"
            src={logo}
            quality={75}
            priority={true}
            width={0}
            height={0}
            className="h-auto w-full max-w-56"
          />
        </div>
        <span className="text-md">Não ha pendências esse este més. Tudo certo! </span>
      </section>
    </div>
  );
}
