"use client";

import Link from "next/link";
import { PenLine, Save, UserRoundX } from "lucide-react";
import { useActionState, useEffect, useState, type ChangeEvent } from "react";
import { saveAccountantAction } from "@/actions/accountant";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Accountant, Mei } from "@/lib/types";

interface FormAccountantProps {
  mei: Mei;
  initialAccountant?: Accountant | null;
}

function getInitialFormValues(accountant?: Accountant | null) {
  return {
    name: accountant?.name ?? "",
    email: accountant?.email ?? "",
    phone: accountant?.phone ?? "",
  };
}

export function FormAccountant({ mei, initialAccountant }: FormAccountantProps) {
  const saveAction = saveAccountantAction.bind(null, initialAccountant ?? null);
  const [state, formAction, isPending] = useActionState(saveAction, null);
  const [formValues, setFormValues] = useState(() =>
    getInitialFormValues(initialAccountant),
  );

  useEffect(() => {
    setFormValues(getInitialFormValues(initialAccountant));
  }, [initialAccountant]);

  useEffect(() => {
    if (state?.data) {
      setFormValues({
        name: state.data.name,
        email: state.data.email,
        phone: state.data.phone,
      });
    }
  }, [state?.data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const hasExistingAccountant = Boolean(initialAccountant?.name || state?.data);

  if (!mei.hasAccountant) {
    return (
      <main className="flex w-full items-center justify-center py-8">
        <section className="w-full max-w-xl rounded-lg border bg-white p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface">
            <UserRoundX className="h-6 w-6 text-primary" />
          </div>

          <h1 className="text-xl font-bold">Contador não informado</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Nos dados do seu MEI consta que você não possui contador. Atualize
            essa informação antes de cadastrar os dados do contador.
          </p>

          <Button asChild className="mt-5 text-white">
            <Link href="/dashboard/mei-data">Atualizar dados do MEI</Link>
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="flex w-full flex-col items-center justify-center py-2 sm:py-4">
      <section className="mx-auto w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold md:text-3xl">
            Cadastre os dados do seu contador
          </h1>

          <p className="mt-2 text-sm md:text-base">
            Mantenha os dados do seu contador atualizados para facilitar a
            comunicação e o envio de informações fiscais.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-center gap-3 border-b border-borderGren pb-3">
          <div className="rounded-full bg-surface p-2">
            <PenLine className="h-5 w-5 text-primary" />
          </div>

          <h2 className="font-semibold text-primary">Preencha o formulário</h2>
        </div>

        <form action={formAction} className="mt-4 flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do contador</Label>

            <Input
              className="border-border"
              name="name"
              id="name"
              type="text"
              placeholder="Digite o nome do contador"
              value={formValues.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail do contador</Label>

            <Input
              className="border-border"
              id="email"
              name="email"
              type="email"
              placeholder="Digite o e-mail do contador"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone do contador</Label>

            <Input
              className="border-border"
              id="phone"
              name="phone"
              inputMode="numeric"
              placeholder="Ex.: (00) 00000-0000"
              value={formValues.phone}
              onChange={handleChange}
            />
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

          <Button type="submit" className="w-full gap-2 text-white" disabled={isPending}>
            <Save className="h-4 w-4" />
            {isPending
              ? hasExistingAccountant
                ? "Atualizando..."
                : "Salvando..."
              : hasExistingAccountant
                ? "Atualizar informações"
                : "Salvar informações"}
          </Button>
        </form>
      </section>
    </main>
  );
}