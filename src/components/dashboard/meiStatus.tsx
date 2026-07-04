import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../../../public/logo2.png";
import Image from "next/image";

export function MeiStatus() {
  return (
    <main className="flex flex-col top-0">
      <section className="w-full border flex flex-col items-center justify-center bg-bgGreen h-32 rounded-md border-border">
        <div className=" flex items-center justify-center mb-4">
          <Image
            alt="logo do app"
            src={logo}
            quality={75}
            priority={true}
            width={0}
            height={0}
            className="w-3xs"
          />
        </div>
        <span className="text-md">Não ha pendências esse este més. Tudo certo! </span>
      </section>
    </main>
  );
}
