# MEI em Dia Frontend

## Comece por aqui

- Consulte [FRONTEND_CONTEXT.md](FRONTEND_CONTEXT.md) para fluxos, rotas, funcionalidades e pendencias conhecidas.
- Consulte [endpoints.md](endpoints.md) antes de alterar contratos com a API.
- Siga as instrucoes de arquivo em [.github/instructions/](.github/instructions/), especialmente as regras de stack e frontend.

## Comandos

- `npm run dev` inicia o ambiente local.
- `npm run build` e a validacao disponivel para mudancas de codigo. Nao ha suite de testes ou linter configurados atualmente.

## Arquitetura

- O projeto usa Next.js App Router em `src/app`; mantenha paginas como Server Components, adicionando `"use client"` somente na borda interativa.
- Centralize mutacoes e chamadas autenticadas a API em Server Actions de `src/actions`, usando `apiClient` de `src/lib/api.ts` e os tipos de `src/lib/types.ts`.
- Componentes de uma rota pertencem ao diretorio `_components` dela; `src/components` e reservado para itens compartilhados. Primitivos reutilizaveis ficam em `src/components/ui`.

## Invariantes importantes

- A sessao usa o cookie HTTP-only `token_MeiEmDia`. Nunca exponha ou armazene o token em codigo cliente.
- A protecao de `/dashboard` ocorre em `src/app/dashboard/layout.tsx` com `AuthenticatedUser()`; nao introduza `middleware.ts` sem uma decisao arquitetural explicita.
- `NEXT_PUBLIC_API_URL` e obrigatoria para o cliente HTTP. Preserve o padrao atual de erros e de retornos serializaveis das Server Actions.
- Use `cn` de `@/lib/utils`, icones de `lucide-react`, e tokens definidos em `src/app/globals.css`. Evite a dependencia `cn` do npm.

## Escopo atual

Documentos, configuracoes avancadas, relatorios e busca na tabela de receitas ainda tem partes pendentes. Antes de implementar qualquer uma delas, confirme o contrato no backend e atualize [FRONTEND_CONTEXT.md](FRONTEND_CONTEXT.md) quando o comportamento de produto mudar.