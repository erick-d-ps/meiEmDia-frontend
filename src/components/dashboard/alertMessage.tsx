import { Megaphone } from "lucide-react"

export function AlertMessage() {
  return (
    <div className="w-full">
      <div className="flex w-full items-start justify-center gap-3 rounded-md border border-border bg-alert p-3 sm:items-center">
        <Megaphone className="h-5 w-5 shrink-0 text-amber-700" />
        <span className="font-medium">Dia 20 se aproxima. Não se esqueça de lançar sua receita!</span>
      </div>
    </div>
  );
}
