import { Button } from "@/components/ui/button";
import { StickyNoteCheck, Briefcase, Wrench, Handshake, Paperclip } from "lucide-react";

export function RecordInvoices() {
  return (
    <main className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col items-center justify-center border border-border rounded-md bg-surface p-2">
        <h2 className="font-normal">Receita no mês</h2>
        <span className="font-bold text-xl">R$ 2525,23</span>
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
        <form className="w-full">
          <Button type="submit" variant="ghost" className="h-auto min-h-9 w-full cursor-pointer whitespace-normal bg-button-green py-2 text-text-white">
            + Adicionar receita
          </Button>
        </form>
        <form className="w-full">
          <Button type="submit" variant="ghost" className="h-auto min-h-9 w-full cursor-pointer whitespace-normal bg-button-gray py-2 text-text-white">
            <Paperclip className="text-text-white w-5 h-5" />
            Anexar documento
          </Button>
        </form>
      </div>
    </main>
  );
}
