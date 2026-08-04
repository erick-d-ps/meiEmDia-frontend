"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Upload } from "lucide-react";
import { ReactNode, useState } from "react";

interface DocumentPrps {
  children: ReactNode;
}

export function DocumentRegister({ children }: DocumentPrps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl bg-surface">
        <DialogTitle className="text-center text-3xl font-bold">
          Anexar documento
        </DialogTitle>
        <DialogHeader>
          <DialogTitle></DialogTitle>

          <DialogDescription className="text-center">
            Envie um comprovante ou uma nota fiscal
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5">
          <label
            htmlFor="file"
            className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted transition hover:bg-muted/70"
          >
            <Upload className="mb-3 h-12 w-12 text-green-500" />

            <p className="text-lg font-medium">Arraste o arquivo aqui ou</p>

            <span className="text-lg font-semibold text-green-600">
              clique para selecionar
            </span>

            <p className="mt-4 text-sm text-muted-foreground">
              Formato aceitos: JPG PNG ou PDF (até 5MB)
            </p>

            <Input
              id="file"
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </label>


          <div className=" flex flex-col w-full gap-2">
            <label>Tipo de documento</label>

            <Select>
              <SelectTrigger className="w-full border-border">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent className="bg-surface w-full">
                <SelectGroup>
                  <SelectItem value="COMPROVANTE">Comprovante</SelectItem>

                  <SelectItem value="NOTA_FISCAL">Nota Fiscal</SelectItem>

                  <SelectItem value="OUTROS">Outros</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className=" flex flex-col w-full gap-2">
            <label>
              Vincular a uma receita{" "}
              <span className="text-muted-foreground">(opcional)</span>
            </label>

            <Select>
              <SelectTrigger className="w-full border-border">
                <SelectValue placeholder="Selecionar receita" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">Receita Julho</SelectItem>

                <SelectItem value="2">Receita Agosto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className=" flex flex-col w-full gap-2">
            <label>
              Observação{" "}
              <span className="text-muted-foreground">(opcional)</span>
            </label>

            <Textarea
              className="border-border"
              rows={5}
              placeholder="EX: pagamento via pix / NF cliente xx"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline">
              Cancelar
            </Button>

            <Button
              type="submit"
              className="bg-button-green px-10 text-white"
            >
              CADASTRAR
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
