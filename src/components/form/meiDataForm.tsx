"use client";

import { useActionState, useState } from "react";
import { Building2, Save, UserRound } from "lucide-react";

import { saveMeiAction } from "@/actions/mei";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MeiDataForm() {
  const [state, formAction, isPending] = useActionState(saveMeiAction, null);
  const [hasAccountant, setHasAccountant] = useState<string | undefined>();

  return (
    <main className="p-4">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-xl p-5 md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold md:text-3xl">Dados do seu MEI</h1>

            <p className="mt-2 text-sm md:text-base">
              Mantenha suas informacoes atualizadas para calcular seus limites e
              gerar relatorios com precisao.
            </p>
          </div>

          <form action={formAction} className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <section>
                <div className="mb-5 flex items-center gap-3 border-b border-borderGren pb-3">
                  <div className="rounded-full bg-surface p-2">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>

                  <h2 className="font-semibold text-primary">
                    Dados da empresa
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      className="border-border"
                      name="cnpj"
                      id="cnpj"
                      inputMode="numeric"
                      placeholder="00.000.000/0000-00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Razao social</Label>
                    <Input
                      className="border-border"
                      id="companyName"
                      name="companyName"
                      placeholder="Digite a razao social"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome Fantasia (opcional)</Label>
                    <Input
                      className="border-border"
                      id="fantasyName"
                      name="fantasyName"
                      placeholder="Digite o nome fantasia"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainActivityCNAE">CNAE principal</Label>
                    <Input
                      className="border-border"
                      name="mainActivityCNAE"
                      id="mainActivityCNAE"
                      inputMode="numeric"
                      placeholder="Ex.: 6201501"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        className="border-border"
                        name="city"
                        id="city"
                        placeholder="Digite a cidade"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        className="border-border"
                        name="state"
                        id="state"
                        maxLength={2}
                        placeholder="Ex.: SP"
                        required
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="mb-5 flex items-center gap-3 border-b border-borderGren pb-3">
                  <div className="rounded-full bg-surface p-2">
                    <UserRound className="h-5 w-5 text-primary" />
                  </div>

                  <h2 className="font-semibold text-primary">
                    Responsavel e atividade
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Nome do titular</Label>
                    <Input
                      className="border-border"
                      name="ownerName"
                      id="ownerName"
                      placeholder="Digite o nome completo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      className="border-border"
                      name="cpf"
                      id="cpf"
                      inputMode="numeric"
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de atividade</Label>
                    <Select name="activityType" required>
                      <SelectTrigger className="w-full border-border">
                        <SelectValue placeholder="Selecione o tipo de atividade" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="SERVICO">Servico</SelectItem>
                        <SelectItem value="COMERCIO">Comercio</SelectItem>
                        <SelectItem value="MISTO">Misto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Possui contador?</Label>
                    <Select
                      name="hasAccountant"
                      required
                      value={hasAccountant}
                      onValueChange={setHasAccountant}
                    >
                      <SelectTrigger className="w-full border-border">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="true">Sim</SelectItem>
                        <SelectItem value="false">Nao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </section>
            </div>

            {state?.error ? (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            ) : null}

            {state?.success && state.message ? (
              <Alert>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            ) : null}

            <Button
              type="submit"
              className="w-full gap-2 text-white"
              disabled={isPending}
            >
              <Save className="h-4 w-4 text-white" />
              {isPending ? "Salvando..." : "Salvar informacoes"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
