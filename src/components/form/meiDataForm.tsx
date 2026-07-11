"use client";

import { useActionState, useEffect, useRef, useState } from "react";
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
import type { Mei } from "@/lib/types";

interface MeiDataFormProps {
  initialMei: Mei | null;
}

export function MeiDataForm({ initialMei }: MeiDataFormProps) {
  const saveAction = saveMeiAction.bind(null, initialMei);
  const [state, formAction, isPending] = useActionState(saveAction, null);
  const formRef = useRef<HTMLFormElement>(null);
  const initialHasAccountant = initialMei
    ? String(initialMei.hasAccountant)
    : undefined;
  const [hasAccountant, setHasAccountant] = useState<string | undefined>(
    initialHasAccountant,
  );
  const meiId = state?.data?.id ?? initialMei?.id;
  const databaseValueClass = initialMei ? "text-muted-foreground" : "";
  const savedHasAccountant = state?.data
    ? String(state.data.hasAccountant)
    : initialHasAccountant;
  const lastAutoSubmittedValue = useRef(savedHasAccountant);

  useEffect(() => {
    if (
      initialMei &&
      hasAccountant !== savedHasAccountant &&
      hasAccountant !== lastAutoSubmittedValue.current &&
      !isPending
    ) {
      // Registra antes do envio para que uma resposta de erro nao dispare
      // automaticamente a mesma requisicao em loop.
      lastAutoSubmittedValue.current = hasAccountant;
      formRef.current?.requestSubmit();
    }
  }, [hasAccountant, initialMei, isPending, savedHasAccountant]);

  return (
    <main className="w-full">
      <section className="mx-auto w-full">
        <div className="rounded-xl px-1 py-3 sm:p-5 md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold md:text-3xl">Dados do seu MEI</h1>

            <p className="mt-2 text-sm md:text-base">
              Mantenha suas informacoes atualizadas para calcular seus limites e
              gerar relatorios com precisao.
            </p>
          </div>

          <form ref={formRef} action={formAction} className="space-y-8">
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
                      className={`border-border ${databaseValueClass}`}
                      name="cnpj"
                      id="cnpj"
                      inputMode="numeric"
                      placeholder="00.000.000/0000-00"
                      defaultValue={initialMei?.cnpj}
                      minLength={14}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Razao social</Label>
                    <Input
                      className={`border-border ${databaseValueClass}`}
                      id="companyName"
                      name="companyName"
                      placeholder="Digite a razao social"
                      defaultValue={initialMei?.companyName}
                      minLength={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fantasyName">Nome Fantasia (opcional)</Label>
                    <Input
                      className={`border-border ${databaseValueClass}`}
                      id="fantasyName"
                      name="fantasyName"
                      placeholder="Digite o nome fantasia"
                      defaultValue={initialMei?.fantasyName}
                      minLength={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainActivityCNAE">CNAE principal</Label>
                    <Input
                      className={`border-border ${databaseValueClass}`}
                      name="mainActivityCNAE"
                      id="mainActivityCNAE"
                      placeholder="Ex.: 6201501 ou Vendas no varejo"
                      defaultValue={initialMei?.mainActivityCNAE}
                      minLength={4}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        className={`border-border ${databaseValueClass}`}
                        name="city"
                        id="city"
                        placeholder="Digite a cidade"
                        defaultValue={initialMei?.city}
                        minLength={2}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        className={`border-border ${databaseValueClass}`}
                        name="state"
                        id="state"
                        maxLength={2}
                        placeholder="Ex.: SP"
                        defaultValue={initialMei?.state}
                        minLength={2}
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
                      className={`border-border ${databaseValueClass}`}
                      name="ownerName"
                      id="ownerName"
                      placeholder="Digite o nome completo"
                      defaultValue={initialMei?.ownerName}
                      minLength={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      className={`border-border ${databaseValueClass}`}
                      name="cpf"
                      id="cpf"
                      inputMode="numeric"
                      placeholder="000.000.000-00"
                      defaultValue={initialMei?.cpf}
                      minLength={11}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de atividade</Label>
                    <Select
                      name="activityType"
                      defaultValue={initialMei?.activityType}
                      required
                    >
                      <SelectTrigger className={`w-full border-border ${databaseValueClass}`}>
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
                      <SelectTrigger className={`w-full border-border ${databaseValueClass}`}>
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
              {isPending
                ? meiId
                  ? "Atualizando..."
                  : "Salvando..."
                : meiId
                  ? "Atualizar informações"
                  : "Salvar informações"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
