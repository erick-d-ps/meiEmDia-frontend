import { Megaphone } from "lucide-react"

export function AlertMessage() {
  return (
    <div className="flex w-full p-4 ">
      <div className="flex w-full gap-3 items-center justify-center border border-border rounded-md bg-alert p-2">
        <Megaphone className="text-amber-700 w-5 h-5" />
        <span className="font-medium">Dia 20 se aproxima. Não se esqueça de lançar sua receita!</span>
      </div>
    </div>
  );
}
