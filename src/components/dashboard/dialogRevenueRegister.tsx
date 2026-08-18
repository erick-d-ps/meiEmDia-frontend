"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { ReactNode, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "../ui/select";
import { CreateRevenue } from "@/actions/documentsRevenue"
import { toast } from "sonner";

interface RevanueProps {
  children: ReactNode;
}

const items = [
  { label: "Venda", value: "VENDA" },
  { label: "Serviço", value: "SERVICO" },
  { label: "Outros", value: "OUTROS" },
];

export function RevenueRegister({ children }: RevanueProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState("")

  async function randlerCreateRevenue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const result = await CreateRevenue(formData)
    
    if(result?.success){
      setIsOpen(false)
      toast.success("Cadastrada com sucesso!")
    }else {
       toast.error(result?.message);
    }

  }

  return (
    <main>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="bg-surface ">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-2xl ">
              Cadastro de receita
            </DialogTitle>
            <DialogDescription className="text-center font-medium">
              Cadastre uma atividade.
            </DialogDescription>
          </DialogHeader>
          <section className="flex flex-col">
            <form onSubmit={randlerCreateRevenue}>
              <div className="flex flex-col gap-1">
                <label>Valor Cobrado</label>
                <Input
                  id="amount"
                  name="amount"
                  className="border-border  [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none
                not-only:[&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="EX: 100,00"
                  type="text"
                />
                <div className="flex =justify-between mt-2 gap-2">
                  <div className="flex-1">
                    <label>Date</label>
                    <Input 
                      id="date"
                      name="date"
                      type="date" 
                      className="border-border" 
                    />
                  </div>
                  <div className="flex-1">
                    <label>Atividade</label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger className="w-full bg-surface">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                       id="type"                     
                       className="bg-surface">
                        <SelectGroup>
                          {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="type" value={type}/>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <label>Descrição da atividade (Opcional)</label>
                <Textarea
                  className="border-border mt-2"
                  id="note"
                  name="note"
                  placeholder="Digite a descrição da atividade..."
                />
              </div>
              <Button className="w-full" type="submit">
                Registrar
              </Button>
            </form>
          </section>
        </DialogContent>
      </Dialog>
    </main>
  );
}
