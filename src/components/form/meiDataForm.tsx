"use client";

import { Building2, Save, UserRound } from "lucide-react";

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
  return (
    <main className="p-4">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-xl p-5 md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold md:text-3xl">Dados do seu MEI</h1>

            <p className="mt-2 text-sm md:text-base">
              Mantenha suas informações atualizadas para calcular seus limites e
              gerar relatórios com precisão.
            </p>
          </div>

          <form className="space-y-8">
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
                      placeholder="00.000.000/0000-00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Razão social</Label>
                    <Input
                      className="border-border"
                      id="companyName"
                      name="companyName"
                      placeholder="Digite a razão social"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fantasyName">
                      Nome fantasia{" "}
                      <span className="text-muted-foreground">(opcional)</span>
                    </Label>
                    <Input
                      className="border-border"
                      id="fantasyName"
                      name="fantazyName"
                      placeholder="Digite o nome fantasia"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnae">CNAE principal</Label>
                    <Input
                      className="border-border"
                      name="cnae"
                      id="cnae"
                      placeholder="Digite o código ou descrição do CNAE"
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
                      <Label htmlFor="city">Estado</Label>
                      <Input
                        className="border-border"
                        name="state"
                        id="state"
                        placeholder="Digite seu Estado"
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
                    Responsável e atividade
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
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de atividade</Label>
                    <Select 
                      name="activityType"
                    >
                      <SelectTrigger className="w-full border-border">
                        <SelectValue placeholder="Selecione o tipo de atividade" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="SERVICO">Serviço</SelectItem>
                        <SelectItem value="COMERCIO">Comércio</SelectItem>
                        <SelectItem value="MISTO">Misto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Possui contador?</Label>
                    <Select name="accountant">
                      <SelectTrigger className="w-full border-border">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>

                      <SelectContent className="bg-white">
                        <SelectItem value="true">Sim</SelectItem>
                        <SelectItem value="false">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountantName">
                      Nome do contador{" "}
                      <span className="text-muted-foreground">(opcional)</span>
                    </Label>
                    <Input
                      className="border-border"
                      name="accountantName"
                      id="accountantName"
                      placeholder="Digite o nome do contador"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="accountantEmail">
                        E-mail do contador{" "}
                        <span className="text-muted-foreground">
                          (opcional)
                        </span>
                      </Label>
                      <Input
                        className="border-border"
                        name="accountantEmail"
                        id="accountantEmail"
                        type="email"
                        placeholder="exemplo@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountantPhone">
                        Telefone{" "}
                        <span className="text-muted-foreground">
                          (opcional)
                        </span>
                      </Label>
                      <Input
                        className="border-border"
                        name="accountantPhone"
                        id="accountantPhone"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <Button type="submit" className="w-full gap-2 text-white">
              <Save className="h-4 w-4 text-white" />
              Salvar informações
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
