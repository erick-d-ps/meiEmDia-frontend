import { Button } from "@/components/ui/button";
import { ChartNoAxesColumnIncreasing, Calendar } from "lucide-react";

export function HistoryButton() {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-6">
        <form className="w-full lg:w-1/2">
          <Button
            type="submit"
            variant="outline"
            className="h-auto min-h-15 w-full cursor-pointer gap-3 whitespace-normal bg-surface px-3 py-3 text-center"
          >
            <ChartNoAxesColumnIncreasing className="text-text-blue w-6 h-6" />
            <strong>Ver relatorio mensal</strong>
          </Button>
        </form>

        <form className="w-full lg:w-1/2">
          <Button
            type="submit"
            variant="outline"
            className="h-auto min-h-15 w-full cursor-pointer gap-3 whitespace-normal bg-surface px-3 py-3 text-center"
          >
            <Calendar className="text-text-blue w-6 h-6" />
            <strong>Histórico do mês</strong>
          </Button>
        </form>
      </div>
    </section>
  );
}
