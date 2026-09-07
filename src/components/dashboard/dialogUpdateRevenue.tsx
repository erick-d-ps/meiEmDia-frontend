"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import React, { useEffect, useState } from "react";

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

import { UpdateRevenue } from "@/actions/documentsRevenue";
import { toast } from "sonner";

interface Revenue {
  id: string;
  amount: string;
  date: string;
  type: string;
  note?: string | null;
}

interface RevenueProps {
  revenue: Revenue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const items = [
  { label: "Venda", value: "VENDA" },
  { label: "Serviço", value: "SERVICO" },
  { label: "Outros", value: "OUTROS" },
];

export function RevenueUpdate({ revenue, open, onOpenChange }: RevenueProps) {
  const [type, setType] = useState(revenue.type);

  useEffect(() => {
    if (open) {
      setType(revenue.type);
    }
  }, [open, revenue.type]);

  async function handleUpdateRevenue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = await UpdateRevenue(revenue.id, formData);

    if (result?.success) {
      onOpenChange(false);

      toast.success("Receita atualizada com sucesso!");
    } else {
      toast.error(result?.message || "Erro ao atualizar receita.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-2xl">
            Editar receita
          </DialogTitle>

          <DialogDescription className="text-center font-medium">
            Altere os dados da receita.
          </DialogDescription>
        </DialogHeader>

        <section className="flex flex-col">
          <form onSubmit={handleUpdateRevenue}>
            <div className="flex flex-col gap-1">
              <label>Valor Cobrado</label>

              <Input
                id="amount"
                name="amount"
                type="text"
                defaultValue={revenue.amount}
                placeholder="EX: 100,00"
                className="border-border"
              />

              <div className="flex justify-between mt-2 gap-2">
                <div className="flex-1">
                  <label>Data</label>

                  <Input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={revenue.date.slice(0, 10)}
                    className="border-border"
                  />
                </div>

                <div className="flex-1">
                  <label>Atividade</label>

                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="w-full bg-surface">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent className="bg-surface">
                      <SelectGroup>
                        {items.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <input type="hidden" name="type" value={type} />
                </div>
              </div>
            </div>

            <div className="my-4">
              <label>Descrição da atividade (Opcional)</label>

              <Textarea
                className="border-border mt-2"
                id="note"
                name="note"
                defaultValue={revenue.note || ""}
                placeholder="Digite a descrição da atividade..."
              />
            </div>

            <Button className="w-full" type="submit">
              Salvar alterações
            </Button>
          </form>
        </section>
      </DialogContent>
    </Dialog>
  );
}
