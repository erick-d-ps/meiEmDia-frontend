"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, MoreVertical, Search } from "lucide-react";
import { RevenueType } from "@/lib/types";

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
  const [revenueData, setRevenueData] = useState<RevenueType[]>([]);
  useEffect(() => {
    async function fetchRevenueData() {
      const response = await SearchHistory();
      if (response?.success) {
        setRevenueData(response.data ?? []);
      }
    }
    fetchRevenueData();
  }, []);

  const getRevenueTypeLabel = (type: keyof typeof revenueTypeConfig) => {
    return revenueTypeConfig[type]?.label || "";
  }
  

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
                    {new Date(item.date).toLocaleDateString("pt-BR")}
                  </TableCell>

                  <TableCell>{item.note}</TableCell>

              

                  <TableCell>
                    <Badge className={revenueTypeConfig[item.type as keyof typeof revenueTypeConfig]?.color}>
                      {getRevenueTypeLabel(item.type as keyof typeof revenueTypeConfig)}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(item.amount))}
                  </TableCell>

                  <TableCell className="text-right font-semibold"></TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="bg-surface" align="end">
                        <DropdownMenuItem>Visualizar</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
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
    </main>
  );
}
