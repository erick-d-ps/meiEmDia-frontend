"use client";

import { useState, useEffect, useContext } from "react";
import { DashboardContext } from "@/context";
import { SearchHistory } from "@/actions/documentsRevenue";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { FileText, MoreVertical, Search } from "lucide-react";

import { RevenueType } from "@/lib/types";
import { RevenueUpdate } from "@/components/dashboard/dialogUpdateRevenue";
import { DeleteRevenue } from "@/actions/documentsRevenue";

const revenueTypeConfig = {
  VENDA: {
    label: "Venda",
    color: "bg-green-100 text-green-700",
  },

  SERVICO: {
    label: "Serviço",
    color: "bg-blue-100 text-blue-700",
  },

  OUTROS: {
    label: "Outros",
    color: "bg-gray-100 text-gray-700",
  },
} as const;

export function RevenueTable() {
  const { selectedDate } = useContext(DashboardContext);

  const [revenueData, setRevenueData] = useState<RevenueType[]>([]);

  const [selectedRevenue, setSelectedRevenue] = useState<RevenueType | null>(
    null,
  );

  const [revenueToDelete, setRevenueToDelete] = useState<RevenueType | null>(
    null,
  );

  useEffect(() => {
    if (!selectedDate) return;

    const date = selectedDate;

    async function fetchRevenueData() {
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const response = await SearchHistory(month, year);

      if (response?.success) {
        setRevenueData(response.data ?? []);
      }
    }

    fetchRevenueData();
  }, [selectedDate]);

  const getRevenueTypeLabel = (type: keyof typeof revenueTypeConfig) => {
    return revenueTypeConfig[type]?.label || "";
  };

  return (
    <main className="flex mx-auto flex-col gap-4 w-full max-w-5xl">
      <Card className="border-border shadow-sm bg-surface">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Histórico de Receitas</CardTitle>

          <div className="relative w-72">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input placeholder="Buscar receita..." className="pr-10" />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>

                <TableHead>DATA</TableHead>

                <TableHead>DESCRIÇÃO</TableHead>

                <TableHead>CATEGORIA</TableHead>

                <TableHead className="text-right">VALOR</TableHead>

                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {revenueData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                  </TableCell>

                  <TableCell>
                    {item.date.slice(0, 10).split("-").reverse().join("/")}
                  </TableCell>

                  <TableCell>{item.note}</TableCell>

                  <TableCell>
                    <Badge
                      className={
                        revenueTypeConfig[
                          item.type as keyof typeof revenueTypeConfig
                        ]?.color
                      }
                    >
                      {getRevenueTypeLabel(
                        item.type as keyof typeof revenueTypeConfig,
                      )}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(item.amount))}
                  </TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="bg-surface" align="end">
                        <DropdownMenuItem
                          onSelect={() => {
                            setSelectedRevenue(item);
                          }}
                        >
                          Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-600"
                          onSelect={() => {
                            setRevenueToDelete(item);
                          }}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedRevenue && (
        <RevenueUpdate
          revenue={selectedRevenue}
          open={!!selectedRevenue}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedRevenue(null);
            }
          }}
        />
      )}
      <AlertDialog
        open={!!revenueToDelete}
        onOpenChange={(open) => {
          if (!open) {
            setRevenueToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="bg-surface">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir receita?</AlertDialogTitle>

            <AlertDialogDescription>
              Tem certeza que deseja excluir esta receita? Essa ação não poderá
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600 text-white"
              onClick={async () => {
                if (!revenueToDelete) return;

                const response = await DeleteRevenue(revenueToDelete.id);

                if (response.success) {
                  setRevenueData((current) =>
                    current.filter(
                      (revenue) => revenue.id !== revenueToDelete.id,
                    ),
                  );

                  setRevenueToDelete(null);
                }
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
