import { MeiStatus } from "../../components/dashboard/meiStatus";
import { HistoryButton } from "../../components/dashboard/historyButton";
import { RecordInvoices } from "../../components/dashboard/recordInvoices"
import { AlertMessage } from "../../components/dashboard/alertMessage";

export default function Dashboard() {
  return (
    <main className="w-full">
      <section className="grid gap-4 xl:grid-cols-2 xl:items-start">
        <div className="min-w-0">
          <MeiStatus />
        </div>
        <div className="min-w-0">
          <RecordInvoices/> 
        </div>
      </section>
      <footer className="mt-4 flex flex-col gap-4">
        <HistoryButton />
        <AlertMessage />
      </footer>
    </main>
  );
}
