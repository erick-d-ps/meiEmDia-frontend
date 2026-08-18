"use client";

import { useState, useContext, useEffect } from "react";
import { DashboardContext } from "@/context";
import { SearchHistory } from "@/actions/documentsRevenue";
import { Button } from "@/components/ui/button";
import {
  StickyNoteCheck,
  Briefcase,
  Wrench,
  Handshake,
  Paperclip,
} from "lucide-react";
import { RevenueRegister } from "@/components/dashboard/dialogRevenueRegister";
import { DocumentRegister } from "./dialogDocumentRegister";

export function RecordInvoices() {
  const { selectedDate } = useContext(DashboardContext);

  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    async function loadRevenue() {
      if (!selectedDate) return;

      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();

      const revenues = await SearchHistory(month, year);

      if (!revenues?.success || !revenues.data) {
        setTotalRevenue(0);
        return;
      }

      const total =
        revenues.data?.reduce(
          (acc, revenue) => acc + Number(revenue.amount),
          0,
        );
      
      setTotalRevenue(total);  
    }

    loadRevenue();
  }, [selectedDate]);

  return (
    <main className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center justify-center border border-border rounded-md bg-surface p-2">
        <h2 className="font-normal">Receita no mês</h2>
        <span className="font-bold text-xl">R$ {totalRevenue.toFixed(2)}</span>
      </div>
      <div className="flex w-full flex-col gap-2 items-center justify-center border border-border rounded-md bg-surface p-2">
        <h1 className="flex gap-1 font-medium">
          <StickyNoteCheck className="text-text-blue w-5 h-5" />
          Lançamentos do mês
        </h1>
        <p className="flex gap-2">
          <strong>4</strong>lansamentos
        </p>
        <div className="w-3/4 border border-border my-2"></div>
        <h2 className="flex gap-1 font-medium">
          <Briefcase className="text-text-blue w-5 h-5" />
          Atividades
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <p className="flex gap-2">
            <Wrench className="text-text-blue w-5 h-5" />
            Serviços:
          </p>
          <strong>2</strong>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <p className="flex gap-2">
            <Handshake className="text-text-blue w-5 h-5" />
            Vendas:
          </p>
          <strong>2</strong>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 items-stretch justify-center my-2">
        <div className="w-full">
          <RevenueRegister>
            <Button
              type="button"
              variant="ghost"
              className="h-auto min-h-9 w-full cursor-pointer whitespace-normal bg-button-green py-2 text-text-white"
            >
              + Adicionar receita
            </Button>
          </RevenueRegister>
        </div>
        <div className="w-full">
          <DocumentRegister>
            <Button
              type="submit"
              variant="ghost"
              className="h-auto min-h-9 w-full cursor-pointer whitespace-normal bg-button-gray py-2 text-text-white"
            >
              <Paperclip className="text-text-white w-5 h-5" />
              Anexar documento
            </Button>
          </DocumentRegister>
        </div>
      </div>
    </main>
  );
}
