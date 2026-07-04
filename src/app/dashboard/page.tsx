import { MeiStatus } from "../../components/dashboard/meiStatus";
import { HistoryButton } from "../../components/dashboard/historyButton";
import { RecordInvoices } from "../../components/dashboard/recordInvoices"
import { AlertMessage } from "../../components/dashboard/alertMessage";

export default function Dashboard() {
  return (
    <main className="w-full mx-auto max-w-7xl justify-center items-center bg-background ">
      <section className="flex items-center flex-col xl:flex-row justify-between gap-2">
        <div className="flex-1 w-full p-4">
          <MeiStatus />
        </div>
        <div className=" flex-1 w-full p-4">
          <RecordInvoices/> 
        </div>
      </section>
      <footer className="flex flex-1 items-center flex-col  justify-between">
        <HistoryButton />
        <AlertMessage />
      </footer>
    </main>
  );
}
