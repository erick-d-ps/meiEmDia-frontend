import { Button } from "@/components/ui/button";
import { ChartNoAxesColumnIncreasing, Calendar } from "lucide-react";

export function HistoryButton() {
  return (
    <section className="mx-auto w-full px-4 py-2">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <form className="w-full lg:w-1/2">
          <Button
            type="submit"
            variant="outline"
            className="bg-surface w-full h-15 gap-5"
          >
            <ChartNoAxesColumnIncreasing className="text-text-blue w-6 h-6" />
            <strong>Ver relatorio mensal</strong>
          </Button>
        </form>

        <form className="w-full lg:w-1/2">
          <Button
            type="submit"
            variant="outline"
            className="bg-surface w-full h-15 gap-5"
          >
            <Calendar className="text-text-blue w-6 h-6" />
            <strong>Histórico do mês</strong>
          </Button>
        </form>
      </div>
    </section>
  );
}
