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
- `next-themes` (0.4.6)
- Sonner
- Lucide React
- React Day Picker
- date-fns
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `tw-animate-css` (1.4.0) - Animações CSS
- `radix-ui` (1.6.0) - Componentes avançados

## Estrutura de Pastas

- `src/app/`
  - Define as rotas, paginas e layouts do App Router.
  - Contem a raiz `/`, o grupo publico `(public)` e a area protegida `/dashboard`.
- `src/actions/`
  - Contem Server Actions relacionadas a autenticacao.
- `src/components/`
  - `form/`: formularios de login e cadastro.
  - `dashboard/`: componentes visuais do dashboard, como sidebar, header, menu mobile e blocos de status.
  - `ui/`: componentes reutilizaveis de interface baseados em Shadcn/Radix.
  - `month-selector.tsx`: seletor de mes/ano usado em dashboard desktop e mobile.
- `src/lib/`
  - Funcoes de autenticacao, cliente de API, tipos e utilitarios.
- `public/`
  - Arquivos estaticos como logos e imagens.

## Rotas Implementadas

- `/`
  - Arquivo: `src/app/page.tsx`
  - Verifica se ja existe usuario autenticado com `getUser()` antes de decidir o destino.
  - Redireciona para `/dashboard` quando ha sessao valida e para `/login` quando nao ha.
- `/login`
  - Arquivo: `src/app/(public)/login/page.tsx`
  - Pagina publica que renderiza o componente `FormLogin`.
  - Tambem valida a sessao atual e redireciona para o dashboard se o usuario ja estiver autenticado.
- `/register`
  - Arquivo: `src/app/(public)/register/page.tsx`
  - Pagina publica que renderiza o componente `FormRegister`.
- `/dashboard`
  - Arquivos: `src/app/dashboard/layout.tsx` e `src/app/dashboard/page.tsx`
  - Area protegida. O layout valida a sessao antes de renderizar os filhos.
  - A pagina principal do dashboard compoe componentes de status, lancamentos e atalhos.
- `/dashboard/monthlyHistory`
  - Arquivo: `src/app/dashboard/monthlyHistory/page.tsx`
  - Pagina base para o historico de meses.
- `/dashboard/reports`
  - Arquivo: `src/app/dashboard/reports/page.tsx`
  - Pagina base para relatorios.
- `/dashboard/settings`
  - Arquivo: `src/app/dashboard/settings/page.tsx`
  - Tela de configuracoes com cards de acesso rapido e uma zona de perigo para exclusao da conta.
- `/dashboard/mei-data`
  - Arquivo: `src/app/dashboard/mei-data/page.tsx`
  - Pagina inicial para dados do MEI.

## Componentes

### Formularios

- `FormLogin`
  - Arquivo: `src/components/form/loginForm.tsx`
  - Componente client.
  - Usa `useActionState(loginAction, null)`.
  - Ao receber `state.success` com `redirectTo`, executa `router.replace(...)`.
- `FormRegister`
  - Arquivo: `src/components/form/registerForm.tsx`
  - Componente client.
  - Usa `useActionState(registerAction, null)`.
  - Ao receber `state.success` com `redirectTo`, executa `router.replace(...)`.
- `MeiDataForm`
  - Arquivo: `src/components/form/meiDataForm.tsx`
  - Componente client.
  - Usa `useActionState(saveMeiAction, null)`.
  - Formulario com dois layouts (grid 1x1 mobile, 2 colunas desktop).
  - Campos: CNPJ, Razão Social, Nome Fantasia, Nome do Proprietário, CPF, Estado, Cidade, CNAE Principal, Tipo de Atividade, Presença de Contador.
  - Usa componentes `Select` para tipo de atividade e estado.
  - Exibe mensagens de sucesso/erro via `Alert`.

### Componentes de Dashboard

- `Sidebar`
  - Arquivo: `src/components/dashboard/sidebar.tsx`
  - Componente client para desktop.
  - Exibe menu lateral com links para `Inicio`, `Histórico de meses`, `Relatórios` e `Configurações`.
  - Usa `usePathname()` para destacar a rota ativa.
  - Inclui botao de logout com `logoutAction`.
- `MobileSidebar`
  - Arquivo: `src/components/dashboard/mobileSidebar.tsx`
  - Componente client para mobile.
  - Usa `Sheet` para abrir o menu lateral.
  - Exibe saudacao com o `userName` logado.
  - Inclui `MonthSelector` e links para as paginas do dashboard.
- `Header`
  - Arquivo: `src/components/dashboard/header.tsx`
  - Componente client exibido apenas em desktop.
  - Contem o `MonthSelector` e a saudacao `Olá, {userName}`.
- `MonthSelector`
  - Arquivo: `src/components/month-selector.tsx`
  - Componente client que abre um `Popover` com um `Calendar`.
  - Permite escolher mes/ano e atualizar o estado de seleção.
- `Settings` (pagina)
  - Arquivo: `src/app/dashboard/settings/page.tsx`
  - Implementa a tela de configuracoes com cards navegaveis e uma secao de exclusao da conta.

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

### Autenticação
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

### Dados de MEI
Arquivo: `src/actions/mei.ts`

- `saveMeiAction`
  - Recebe dados de MEI via `FormData` (cnpj, companyName, fantasyName, ownerName, cpf, state, city, mainActivityCNAE, activityType, hasAccountant).
  - Valida `ActivityType` (deve ser "SERVICO", "COMERCIO" ou "MISTO").
  - Sanitiza CNPJ e CPF removendo caracteres não-digitais.
  - Requer autenticacao (token valido).
  - Faz `POST /mei` usando `apiClient` com token.
  - Em sucesso, retorna `{ success: true, error: "", message: "Dados do MEI salvos com sucesso." }`.
  - Em erro 401, retorna mensagem de sessao expirada.
  - Em erro 400, retorna mensagem de erro da API.
  - Em outros erros, retorna mensagem genérica.

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
- passar `user.name` ao `MobileSidebar` e ao `Header` para exibicao da saudacao

Observacoes:

- o layout inclui `Sidebar`, `MobileSidebar` e `Header`.
- `user` e retornado por `AuthenticatedUser()` e usado no header mobile e desktop.
- `Header` e exibido apenas em telas maiores e inclui `MonthSelector`.
- `MobileSidebar` exibe um menu `Sheet`, o `MonthSelector` e o nome do usuario.
- o `Sidebar` desktop e o `MobileSidebar` mobile contem links para as paginas do dashboard.
- a rota `/dashboard/settings` ja esta implementada e acessivel pelo menu.

## Como Funciona o Redirect para Login

Ha tres fluxos principais de redirect relacionados ao login:

### 1. Redirect automatico ao acessar a raiz

Arquivo: `src/app/page.tsx`

- a rota `/` consulta `getUser()` antes de decidir o destino
- se houver usuario autenticado, envia para `/dashboard`
- se nao houver, envia para `/login`

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

- `POST /session` - Login do usuario
- `POST /user` - Registro de novo usuario
- `GET /me` - Recupera dados do usuario autenticado
- `POST /mei` - Salva dados do MEI do usuario

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
- `ActivityType`
  - Union type: `"SERVICO" | "COMERCIO" | "MISTO"`
  - Representa o tipo de atividade do MEI
- `Mei`
  - `id`
  - `cnpj`
  - `companyName`
  - `fantasyName?` (opcional)
  - `ownerName`
  - `cpf`
  - `state`
  - `city`
  - `mainActivityCNAE`
  - `activityType` (ActivityType)
  - `hasAccountant` (boolean)
- `FormActionState`
  - `success` (boolean)
  - `error` (string)
  - `message?` (string - opcional, para mensagens de sucesso)
  - `redirectTo?` (string - opcional, para redirecionamentos)

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

- Logout esta implementado e integrado ao menu do dashboard via `logoutAction`.
- Nao ha middleware global para autenticacao (proteção via layout ✓).
- O dashboard inclui sidebar desktop e mobile, alem de uma tela de configuracoes.
- Pagina `/dashboard/mei-data` agora esta funcional com `MeiDataForm` para cadastro de dados do MEI.
- As paginas `/dashboard/monthlyHistory`, `/dashboard/reports`, `/dashboard/settings` e `/dashboard/mei-data` existem e estao acessiveis.
- Suporte a temas com `next-themes` adicionado.
- Animacoes CSS via `tw-animate-css` para melhor experiencia visual.
- Novos tipos de dados estruturados para MEI com validacao de ActivityType.
- Server Actions com tratamento robusto de erros (sessao expirada, validacao, erros 400/401).
- FormActionState padronizado para todas as server actions com suporte a mensagens e redirecionamentos opcionais.

## Historico de Mudancas Recentes

### Atualizacoes em Julho de 2026

**Novas dependências adicionadas:**
- `next-themes` (0.4.6) - Suporte a temas (claro/escuro)
- `radix-ui` (1.6.0) - Componentes avançados de UI
- `tw-animate-css` (1.4.0) - Animações CSS via Tailwind

**Novas funcionalidades:**
- Server Action `saveMeiAction` em `src/actions/mei.ts` para salvar dados de MEI
- Novo tipo `Mei` com estrutura completa de dados de MEI
- Novo tipo `ActivityType` com validacao de tipo de atividade
- Novo componente `MeiDataForm` para formulario de cadastro de MEI
- Novo endpoint consumido: `POST /mei`

**Melhorias em tipos:**
- `FormActionState` agora inclui campos opcionais `message` e `redirectTo` para melhor controle de fluxo
- Sanitizacao de CNPJ e CPF na Server Action (remocao de caracteres não-digitais)
- Validacao de `ActivityType` na Server Action antes de enviar para a API

**Status atual:**
- Frontend totalmente funcional com autenticacao, dashboard protegido e formulario de MEI
- Pronto para integração com backend para persistencia de dados de MEI
- Estrutura de tipos consolidada para suportar proximas features
