# FRONTEND_CONTEXT

Documento tecnico do frontend do projeto `mei-em-dia`, baseado no codigo atual da pasta `frontend`.

## Tecnologias Utilizadas

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Shadcn/ui
- Radix UI / Base UI
- Server Actions do Next.js
- `next/navigation`
- `next/headers`
- `next/font`
- Sonner
- Lucide React
- React Day Picker
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

## Estrutura de Pastas

- `src/app/`
  - Define as rotas, paginas e layouts do App Router.
  - Contem a raiz `/`, o grupo publico `(public)` e a area protegida `/dashboard`.
- `src/actions/`
  - Contem Server Actions relacionadas a autenticacao.
- `src/components/`
  - `form/`: formularios de login e cadastro.
  - `ui/`: componentes reutilizaveis de interface baseados em Shadcn/Radix.
  - `month-selector.tsx`: seletor de mes/ano usado em dashboard desktop e mobile.
- `src/lib/`
  - Funcoes de autenticacao, cliente de API, tipos e utilitarios.
- `public/`
  - Arquivos estaticos como logos e imagens.

## Rotas Implementadas

- `/`
  - Arquivo: `src/app/page.tsx`
  - Faz redirecionamento imediato para `/login` com `redirect("/login")`.
- `/login`
  - Arquivo: `src/app/(public)/login/page.tsx`
  - Pagina publica que renderiza o componente `FormLogin`.
- `/register`
  - Arquivo: `src/app/(public)/register/page.tsx`
  - Pagina publica que renderiza o componente `FormRegiste`.
- `/dashboard`
  - Arquivos: `src/app/dashboard/layout.tsx` e `src/app/dashboard/page.tsx`
  - Area protegida. O layout valida a sessao antes de renderizar os filhos.
- `/dashboard/monthlyHistory`
  - Arquivo: `src/app/dashboard/monthlyHistory/page.tsx`
  - Pagina de historico de meses acessivel pelo dashboard.
- `/dashboard/reports`
  - Arquivo: `src/app/dashboard/reports/page.tsx`
  - Pagina de relatorios acessivel pelo dashboard.

## Componentes

### Formularios

- `FormLogin`
  - Arquivo: `src/components/form/loginForm.tsx`
  - Componente client.
  - Usa `useActionState(loginAction, null)`.
  - Ao receber `state.success` com `redirectTo`, executa `router.replace(...)`.
- `FormRegiste`
  - Arquivo: `src/components/form/registerForm.tsx`
  - Componente client.
  - Usa `useActionState(registerAction, null)`.
  - Ao receber `state.success` com `redirectTo`, executa `router.replace(...)`.

### Componentes de Dashboard

- `Sidebar`
  - Arquivo: `src/app/dashboard/components/sidebar.tsx`
  - Componente client para desktop.
  - Contem links para `Inicio`, `Histórico de meses`, `Relatórios` e `Configuração`.
  - Inclui botao de logout que envia o form para `logoutAction`.
- `MobileSidebar`
  - Arquivo: `src/app/dashboard/components/mobileSidebar.tsx`
  - Componente client para mobile.
  - Usa `Sheet` para abrir o menu lateral.
  - Exibe saudacao com o `userName` logado.
  - Inclui `MonthSelector` e os mesmos itens de menu do sidebar desktop.
- `Header`
  - Arquivo: `src/app/dashboard/components/header.tsx`
  - Componente client exibido apenas em desktop.
  - Contem o `MonthSelector` e a saudacao `Olá, {userName}`.
- `InfoMei`
  - Arquivo: `src/app/dashboard/components/infoMei.tsx`
  - Renderiza um cartão com o logo do app e mensagem de status do mês.
- `HistoryButton`
  - Arquivo: `src/app/dashboard/components/historyButton.tsx`
  - Renderiza dois botões de ação: `Ver relatório mensal` e `Histórico do mês`.
- `MonthSelector`
  - Arquivo: `src/components/month-selector.tsx`
  - Componente client que abre um `Popover` com um `Calendar`.
  - Permite escolher mes/ano e atualizar o estado de seleção.

### Componentes de UI

Todos ficam em `src/components/ui/` e servem como primitives reutilizaveis da interface:

- `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction`
- `Button`
- `Calendar`, `CalendarDayButton`
- `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardContent`, `CardDescription`, `CardAction`
- `Checkbox`
- `Combobox`
- `Dialog`
- `Field`
- `Input`
- `InputGroup`
- `Label`
- `Select` e subcomponentes
- `Separator`
- `Sheet`
- `Textarea`
- `Toaster`

## Server Actions Existentes

Arquivo: `src/actions/auth.ts`

- `registerAction`
  - Recebe `name`, `email` e `password` via `FormData`.
  - Faz `POST /user` usando `apiClient`.
  - Em sucesso, retorna `{ success: true, error: "", redirectTo: "/login" }`.
  - Em erro, retorna `{ success: false, error: ... }`.
- `loginAction`
  - Recebe `email` e `password` via `FormData`.
  - Faz `POST /session` usando `apiClient`.
  - Salva o token no cookie por meio de `setToken(authData.token)`.
  - Em sucesso, retorna `{ success: true, error: "", redirectTo: "/dashboard" }`.
  - Em erro, trata especialmente status `401` e `400`.
- `logoutAction`
  - Remove o cookie de autenticacao via `removeToken()`.
  - Redireciona para `/login`.

## Sistema de Autenticacao

Arquivos principais:

- `src/actions/auth.ts`
- `src/lib/auth.ts`
- `src/lib/api.ts`
- `src/lib/types.ts`

Fluxo atual:

1. O usuario envia o formulario de login.
2. `loginAction` chama `POST /session`.
3. A API responde com um `AuthUser`, incluindo `token`.
4. O token e salvo em cookie HTTP-only com `setToken`.
5. O formulario recebe `redirectTo: "/dashboard"` e faz navegacao client-side com `router.replace`.
6. Ao entrar em `/dashboard`, o layout chama `AuthenticatedUser()`.
7. `AuthenticatedUser()` usa `getUser()`, que le o token do cookie e chama `GET /me`.
8. Se a API confirmar o usuario, o dashboard e renderizado. Se nao confirmar, ocorre redirect para `/login`.

## Protecao de Rotas

Atualmente a protecao existe apenas na area `dashboard`.

- Funcao responsavel: `AuthenticatedUser()` em `src/lib/auth.ts`
- Ponto de aplicacao: `src/app/dashboard/layout.tsx`
- Estrategia:
  - le o cookie `token_MeiEmDia`
  - se nao houver token, retorna `redirect("/login")`
  - se houver token, chama `/me`
  - se `/me` falhar ou retornar usuario invalido, tambem redireciona para `/login`

Nao existe `middleware.ts` no projeto neste momento. A protecao e feita no layout server-side da rota protegida.

## Como o Dashboard e Protegido

O dashboard e protegido no arquivo `src/app/dashboard/layout.tsx`.

Esse layout e assincrono e executa:

```tsx
const user = await AuthenticatedUser();
```

A funcao `AuthenticatedUser()`:

- chama `getUser()`
- `getUser()` le o token salvo em cookie
- se existir token, envia a requisicao autenticada para `GET /me`
- se nao existir usuario valido, executa `redirect("/login")`

Como o layout e server-side, o conteudo de `/dashboard` nem chega a ser renderizado para usuarios nao autenticados.

## Como Funciona o DashboardLayout

Arquivo: `src/app/dashboard/layout.tsx`

Responsabilidades atuais:

- validar autenticacao antes de renderizar o dashboard
- envolver as paginas filhas com a estrutura base do dashboard
- renderizar o `Sidebar` no desktop e o `MobileSidebar` no mobile
- renderizar o `Header` em desktop
- passar `user.name` ao `MobileSidebar` para exibicao da saudacao

Observacoes:

- o layout agora inclui `Sidebar`, `MobileSidebar` e `Header`.
- `user` e retornado por `AuthenticatedUser()` e usado no header mobile.
- `Header` e exibido no desktop e inclui `MonthSelector`.
- `MobileSidebar` exibe um menu `Sheet`, o `MonthSelector` e o nome do usuario.
- o `Sidebar` desktop e o `MobileSidebar` mobile contem links para as paginas do dashboard.
- existe um link de configuracao no sidebar, mas a rota `/dashboard/settings` nao esta presente no workspace atual.

## Como Funciona o Redirect para Login

Ha tres fluxos de redirect relacionados ao login:

### 1. Redirect automatico ao acessar a raiz

Arquivo: `src/app/page.tsx`

- a rota `/` executa `redirect("/login")`
- isso faz a aplicacao abrir diretamente a tela de login

### 2. Redirect quando o usuario nao esta autenticado

Arquivo: `src/lib/auth.ts`

- `AuthenticatedUser()` chama `redirect("/login")` quando `getUser()` retorna `null`
- isso acontece quando:
  - nao existe cookie `token_MeiEmDia`
  - o token e invalido
  - a chamada para `/me` falha

### 3. Redirect apos sucesso no login e cadastro

Arquivos:

- `src/components/form/loginForm.tsx`
- `src/components/form/registerForm.tsx`

Nestes casos o redirect nao usa `redirect()` do servidor. O fluxo e:

- a Server Action retorna `redirectTo`
- o componente client observa `state.success`
- o `useEffect` chama `router.replace(state.redirectTo)`

## API Client

Arquivo: `src/lib/api.ts`

Funcoes:

- `getApiUrl()`
  - retorna o valor de `NEXT_PUBLIC_API_URL`
- `apiClient<T>()`
  - centraliza chamadas HTTP da aplicacao
  - concatena `NEXT_PUBLIC_API_URL + endpoint`
  - envia `Content-Type: application/json`
  - injeta header `Authorization: Bearer <token>` quando recebe `token`
  - faz parse do JSON de resposta
  - em erro HTTP, lanca `Error` com payload serializado contendo `message` e `status`

Endpoints consumidos atualmente:

- `POST /session`
- `POST /user`
- `GET /me`

## Tipos

Arquivo: `src/lib/types.ts`

- `User`
  - `id`
  - `name`
  - `email`
  - `createAt`
- `AuthUser`
  - `id`
  - `name`
  - `email`
  - `token`

## Variaveis de Ambiente Utilizadas

As variaveis efetivamente usadas no codigo sao:

- `NEXT_PUBLIC_API_URL`
  - usada em `src/lib/api.ts`
  - define a URL base da API consumida pelo frontend
  - valor atual no `.env`: `http://localhost:3333`
- `NODE_ENV`
  - usada em `src/lib/auth.ts`
  - controla a flag `secure` do cookie:
    - `true` em producao
    - `false` fora de producao

Observacao importante:

- `NODE_ENV` aparece no `.env`, mas em aplicacoes Next.js normalmente ela ja e controlada pelo proprio runtime/build.

## Observacoes Gerais do Estado Atual

- Logout esta implementado e integrado ao sidebar do dashboard via `logoutAction`.
- Nao ha middleware global para autenticacao.
- O dashboard agora inclui sidebar desktop e mobile, mas ainda e funcionalmente basico.
- O dashboard desktop e mobile compartilham links para `Inicio`, `Histórico de meses` e `Relatórios`.
- O metadata global em `src/app/layout.tsx` ainda esta com os valores padrao do Create Next App.
