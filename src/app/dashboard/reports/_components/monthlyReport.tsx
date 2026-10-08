"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Banknote,
  FileText,
  Handshake,
  LoaderCircle,
  Package,
  Receipt,
  Wrench,
} from "lucide-react";

import { SearchHistory } from "@/actions/documentsRevenue";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardContext } from "@/context";
import { RevenueType } from "@/lib/types";
import { cn } from "@/lib/utils";

const revenueTypeConfig = {
  VENDA: {
    label: "Venda",
    color: "bg-green-100 text-green-700",
    icon: Handshake,
  },
  SERVICO: {
    label: "Serviço",
    color: "bg-blue-100 text-blue-700",
    icon: Wrench,
  },
  OUTROS: {
    label: "Outros",
    color: "bg-gray-100 text-gray-700",
    icon: Package,
  },
} as const;

type RevenueTypeKey = keyof typeof revenueTypeConfig;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(date: string) {
  return date.slice(0, 10).split("-").reverse().join("/");
}

function getRevenueTypeLabel(type: string) {
  return revenueTypeConfig[type as RevenueTypeKey]?.label || type;
}

export function MonthlyReport() {
  const { selectedDate } = useContext(DashboardContext);
  const [revenues, setRevenues] = useState<RevenueType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!selectedDate) return;

    const date = selectedDate;

    async function loadMonthlyReport() {
      setIsLoading(true);
      setErrorMessage("");

      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const response = await SearchHistory(month, year);

      if (!response?.success || !response.data) {
        setRevenues([]);
        setErrorMessage(
          response?.message || "Não foi possível carregar o relatório mensal.",
        );
        setIsLoading(false);
        return;
      }

      setRevenues(response.data);
      setIsLoading(false);
    }

    loadMonthlyReport();
  }, [selectedDate]);

  const summary = useMemo(() => {
    const totalsByType = {
      VENDA: 0,
      SERVICO: 0,
      OUTROS: 0,
    };

    const countsByType = {
      VENDA: 0,
      SERVICO: 0,
      OUTROS: 0,
    };

    let totalAmount = 0;

    for (const revenue of revenues) {
      const amount = Number(revenue.amount) || 0;
      totalAmount += amount;

      if (revenue.type === "VENDA") {
        totalsByType.VENDA += amount;
        countsByType.VENDA += 1;
      } else if (revenue.type === "SERVICO") {
        totalsByType.SERVICO += amount;
        countsByType.SERVICO += 1;
      } else if (revenue.type === "OUTROS") {
        totalsByType.OUTROS += amount;
        countsByType.OUTROS += 1;
      }
    }

    return {
      totalAmount,
      totalCount: revenues.length,
      totalsByType,
      countsByType,
    };
  }, [revenues]);

  const periodLabel = selectedDate
    ? format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR })
    : "Carregando período...";

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <Card className="border-border bg-surface shadow-sm">
        <CardHeader>
          <CardTitle>Relatório Mensal</CardTitle>
          <CardDescription className="capitalize">{periodLabel}</CardDescription>
        </CardHeader>
      </Card>

      {errorMessage ? (
        <Card className="border-danger/30 bg-surface shadow-sm">
          <CardContent className="py-4 text-sm text-danger">
            {errorMessage}
          </CardContent>
        </Card>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2">
        <Card className="border-border bg-surface shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <div>
              <CardDescription>Receita total do mês</CardDescription>
              <CardTitle className="mt-1 text-2xl">
                {isLoading ? "..." : formatCurrency(summary.totalAmount)}
              </CardTitle>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-primary-light">
              <Banknote className="size-5 text-button-green" />
            </div>
          </CardHeader>
        </Card>

        <Card className="border-border bg-surface shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <div>
              <CardDescription>Quantidade de receitas</CardDescription>
              <CardTitle className="mt-1 text-2xl">
                {isLoading ? "..." : summary.totalCount}
              </CardTitle>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full bg-primary-light">
              <Receipt className="size-5 text-button-green" />
            </div>
          </CardHeader>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {(Object.keys(revenueTypeConfig) as RevenueTypeKey[]).map((type) => {
          const config = revenueTypeConfig[type];
          const Icon = config.icon;

          return (
            <Card key={type} className="border-border bg-surface shadow-sm">
              <CardHeader className="gap-3">
                <div className="flex items-center justify-between gap-2">
                  <CardDescription className="flex items-center gap-2 font-medium text-text">
                    <Icon className="size-4 text-text-blue" />
                    {config.label}
                  </CardDescription>
                  <Badge className={cn(config.color)}>
                    {summary.countsByType[type]}
                  </Badge>
                </div>
                <CardTitle className="text-xl">
                  {isLoading
                    ? "..."
                    : formatCurrency(summary.totalsByType[type])}
                </CardTitle>
              </CardHeader>
            </Card>
          );
        })}
      </section>

      <Card className="border-border bg-surface shadow-sm">
        <CardHeader>
          <CardTitle>Receitas do mês</CardTitle>
          <CardDescription>
            Lista completa das receitas registradas no período selecionado.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-text-muted">
              <LoaderCircle className="size-4 animate-spin" />
              Carregando receitas...
            </div>
          ) : revenues.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-text-muted">
              Nenhuma receita encontrada para o mês selecionado.
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-3 p-4 md:hidden">
                {revenues.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-border bg-surface-secondary/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green-100">
                          <FileText className="size-4 text-green-600" />
                        </div>

                        <div className="min-w-0 space-y-1">
                          <p className="text-sm font-medium text-text">
                            {formatDate(item.date)}
                          </p>
                          <p className="wrap-break-word text-sm text-text-gray">
                            {item.note || "—"}
                          </p>
                        </div>
                      </div>

                      <Badge
                        className={cn(
                          "shrink-0",
                          revenueTypeConfig[item.type as RevenueTypeKey]?.color,
                        )}
                      >
                        {getRevenueTypeLabel(item.type)}
                      </Badge>
                    </div>

                    <div className="mt-3 border-t border-border pt-3">
                      <p className="text-xs text-text-muted">Valor</p>
                      <p className="text-base font-semibold text-text">
                        {formatCurrency(Number(item.amount) || 0)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>DATA</TableHead>
                      <TableHead>DESCRIÇÃO</TableHead>
                      <TableHead>CATEGORIA</TableHead>
                      <TableHead className="text-right">VALOR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenues.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex size-8 items-center justify-center rounded-full bg-green-100">
                            <FileText className="size-4 text-green-600" />
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(item.date)}</TableCell>
                        <TableCell>{item.note || "—"}</TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              revenueTypeConfig[item.type as RevenueTypeKey]
                                ?.color,
                            )}
                          >
                            {getRevenueTypeLabel(item.type)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(Number(item.amount) || 0)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
