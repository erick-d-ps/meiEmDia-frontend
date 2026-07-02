import { InfoMei } from "./components/infoMei";
import { HistoryButton } from "./components/historyButton";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6">
      <section className="flex items-center flex-col sm:flex-row justify-between gap-2">
        <div className="flex-1 w-full p-4">
          <InfoMei />
        </div>
        <div className=" flex-1 w-full p-4"></div>
      </section>
      <footer className="flex items-center flex-col sm:flex-row justify-between gap-2">
        <HistoryButton />
      </footer>
    </main>
  );
}
