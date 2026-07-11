"use client";

import { useState } from "react";
import { PenLine, Save,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FormAccountant() {
  const [hasAccountant, setHasAccountant] = useState<string | undefined>();
  return (
    <main className="flex w-full flex-col items-center justify-center py-2 sm:py-4">
      <section className="mx-auto w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold md:text-3xl">
            Cadastre os dados do seu Contador
          </h1>

          <p className="mt-2 text-sm md:text-base">
            Mantenha os dados do seu contador atualizados para facilitar a
            comunicação e o envio de informações fiscais.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-center gap-3 border-b border-borderGren pb-3">
          <div className="rounded-full bg-surface p-2">
            <PenLine className="h-5 w-5 text-primary" />
          </div>

          <h2 className="font-semibold text-primary">Preencha o Formulario</h2>
        </div>
        <form className="gap-4 mt-4 flex flex-col">
          <div className="space-y-2">
            <Label>Possui contador?</Label>
            <Select
              name="hasAccountant"
              required
              value={hasAccountant}
              onValueChange={setHasAccountant}
            >
              <SelectTrigger className="w-full border-border">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectItem value="true">Sim</SelectItem>
                <SelectItem value="false">Nao</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do contador</Label>
            <Input
              className="border-border"
              name="name"
              id="name"
              type="text"
              placeholder="Digite o nome do seu contador"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail do Contador</Label>
            <Input
              className="border-border"
              id="email"
              name="email"
              placeholder="Digite o e-mail do seu contador"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone do contador</Label>
            <Input
              className="border-border"
              id="phone"
              name="phone"
              inputMode="numeric"
              placeholder="EX: (00) 00000-0000"
              required
            />
          </div>
          <Button
              type="submit"
              className="w-full gap-2 text-white"
              
            >
              <Save className="h-4 w-4 text-white" />
              Salvar informações
            </Button>
        </form>
      </section>
    </main>
  );
}
