import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CircleUserRound,
  Landmark,
  Download,
  Crown,
  ShieldCheck,
  Trash2,
} from "lucide-react";

const settingsItems = [
  {
    title: "Dados do MEI",
    description:
      "Atualize as informações do seu MEI, como dados da empresa, atividade e endereço.",
    icon: Building2,
    href: "/dashboard/mei-data"
  },
  {
    title: "Minha conta",
    description: "Altere seu nome, e-mail e senha de acesso.",
    icon: CircleUserRound,
    href: "/"
  },
  {
    title: "Contador",
    description: "Cadastre ou edite os dados do seu contador.",
    icon: Landmark,
    href: "/dashboard/accountant"
  },
  {
    title: "Exportar dados",
    description: "Baixe suas receitas, documentos e relatórios em CSV ou PDF.",
    icon: Download,
    href: "/"
  },
  {
    title: "Plano",
    description: "Veja seu plano atual e conheça os benefícios disponíveis.",
    icon: Crown,
    href: "/"
  },
  {
    title: "Segurança",
    description: "Gerencie sessões ativas e opções de segurança da sua conta.",
    icon: ShieldCheck,
    href: "/"
  },
];

export default function Settings() {
  return (
    <main className="mx-auto max-h-screen w-full max-w-7xl p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Configurações</h1>
        <p className="text-text-gray">
          Gerencie os dados e preferências da sua conta
        </p>
      </header>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {settingsItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="h-auto min-h-32 justify-between whitespace-normal rounded-md border-border bg-white p-6 text-left hover:border-green-500 hover:bg-white hover:shadow-sm"
              
            >
              <div className="flex items-center gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Icon size={28} strokeWidth={2} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="mt-1 max-w-xs text-sm font-normal text-text-gray">
                    {item.description}
                  </p>
                </div>
              </div>

              <ArrowRight className="ml-4 shrink-0 text-green-600" size={28} />
            </Link>
          );
        })}
      </section>

      <section className="mt-8 flex flex-col gap-5 rounded-md border border-red-300 bg-red-50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-200 text-red-600">
            <Trash2 size={26} />
          </div>

          <div>
            <h2 className="font-bold text-red-600">Zona de perigo</h2>
            <p className="text-sm text-text-gray">
              Excluir conta e todos os dados permanentemente. Esta ação não pode
              ser desfeita.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
        >
          Excluir conta
        </Button>
      </section>
    </main>
  );
}
