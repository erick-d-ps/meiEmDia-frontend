import { getMei } from "@/actions/mei";
import { MeiDataForm } from "@/components/form/meiDataForm";

export default async function MeiData() {
  const mei = await getMei();

  return (
    <main>
      <MeiDataForm initialMei={mei} />
    </main>
  );
}
