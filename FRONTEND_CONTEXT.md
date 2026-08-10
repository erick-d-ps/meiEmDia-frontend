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
  - Contem Server Actions de autenticacao, MEI, contador e receitas/documentos.
- `src/components/`
  - `form/`: formularios de login, cadastro, MEI e contador.
  - `dashboard/`: componentes visuais do dashboard, sidebar, header, status, lancamentos e historicos.
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
  - Valida a sessao atual e redireciona para o dashboard se o usuario ja estiver autenticado.
- `/register`
  - Arquivo: `src/app/(public)/register/page.tsx`
  - Pagina publica que renderiza o componente `FormRegister`.
- `/dashboard`
  - Arquivos: `src/app/dashboard/layout.tsx` e `src/app/dashboard/page.tsx`
  - Area protegida. O layout valida a sessao antes de renderizar os filhos.
  - A pagina principal compoe `MeiStatus`, `RecordInvoices`, `HistoryButton` e `AlertMessage`.
- `/dashboard/mei-data`
  - Arquivo: `src/app/dashboard/mei-data/page.tsx`
  - Pagina de cadastro/edicao dos dados do MEI.
- `/dashboard/accountant`
  - Arquivo: `src/app/dashboard/accountant/page.tsx`
  - Pagina de cadastro/edicao dos dados do contador.
  - Busca os dados do MEI e do contador em paralelo e renderiza `FormAccountant`.
- `/dashboard/monthlyHistory`
  - Arquivo: `src/app/dashboard/monthlyHistory/page.tsx`
  - Pagina de historico de receitas com `RevenueTable`.
- `/dashboard/reports`
  - Arquivo: `src/app/dashboard/reports/page.tsx`
  - Tela ainda em esqueleto/placeholder, sem implementacao completa de relatorios.
- `/dashboard/settings`
  - Arquivo: `src/app/dashboard/settings/page.tsx`
  - Tela com cards de acesso rapido e secao de exclusao de conta.

## Componentes Principais

### Formulários

- `FormLogin`
  - Arquivo: `src/components/form/loginForm.tsx`
  - Componente client.
  - Usa `useActionState(loginAction, null)`.
  - Ao receber `state.success` com `redirectTo`, executa `router.replace(...)`.
- `FormRegister`
  - Arquivo: `src/components/form/registerForm.tsx`
  - Componente client.
  - Usa `useActionState(registerAction, null)`.
  - Em caso de sucesso, navega para `/login`.
- `MeiDataForm`
  - Arquivo: `src/components/form/meiDataForm.tsx`
  - Componente client.
  - Usa `useActionState(saveMeiAction, null)`.
  - Formulario com layout responsivo e campos de MEI.
  - Campos: CNPJ, Razão Social, Nome Fantasia, Nome do Proprietário, CPF, Estado, Cidade, CNAE Principal, Tipo de Atividade e Presença de Contador.
  - Inclui validacao de tipo de atividade e envio automatico do valor `hasAccountant` quando o usuario altera a opcao.
- `FormAccountant`
  - Arquivo: `src/components/form/formAccountant.tsx`
  - Componente client.
  - Usa `useActionState(saveAccountantAction, null)`.
  - Valida nome, e-mail e telefone. 
  - Se o MEI indicar que nao tem contador, exibe tela informativa e orienta a atualizar os dados do MEI antes de cadastrar o contador.

### Componentes de Dashboard

- `Sidebar`
  - Arquivo: `src/components/dashboard/sidebar.tsx`
  - Menu lateral desktop.
  - Links para `Inicio`, `Histórico de meses`, `Relatórios` e `Configurações`.
  - Usa `usePathname()` para destacar item ativo.
  - Inclui botao de logout com `logoutAction`.
- `MobileSidebar`
  - Arquivo: `src/components/dashboard/mobileSidebar.tsx`
  - Menu lateral mobile com `Sheet`.
  - Exibe saudacao com o nome do usuario.
  - Inclui `MonthSelector` e links do dashboard.
- `Header`
  - Arquivo: `src/components/dashboard/header.tsx`
  - Cabeçalho desktop com `MonthSelector` e saudacao `Olá, {userName}`.
- `MonthSelector`
  - Arquivo: `src/components/month-selector.tsx`
  - Abre um `Popover` com `Calendar`.
  - Permite seleção de mes/ano e atualiza estado da data.
- `MeiStatus`
  - Arquivo: `src/components/dashboard/meiStatus.tsx`
  - Bloco de status do dashboard.
  - Atualmente apresenta texto estático indicando que não há pendências no mes.
- `RecordInvoices`
  - Arquivo: `src/components/dashboard/recordInvoices.tsx`
  - Card de resumo mensal de receitas e atividades.
  - Exibe valores fixos e botões para adicionar receita e anexar documento.
  - Usa `RevenueRegister` e `DocumentRegister` como modais.
- `HistoryButton`
  - Arquivo: `src/components/dashboard/historyButton.tsx`
  - Blocos de acesso para relatorio mensal e histórico do mes.
  - O botão de relatorio mensal ainda aponta para `href=""` (placeholder).
- `RevenueTable`
  - Arquivo: `src/components/dashboard/revenueTable.tsx`
  - Tabela de histórico de receitas.
  - Busca dados com `SearchHistory()` ao montar o componente.
  - Mapeia tipos `VENDA`, `SERVICO` e `OUTROS` para labels visuais.
- `RevenueRegister`
  - Arquivo: `src/components/dashboard/dialogRevenueRegister.tsx`
  - Modal para registrar receitas.
  - Envia `amount`, `date`, `type` e `note` para `CreateRevenue()`.
  - Usa `sonner` para exibir tost notifications.
- `DocumentRegister`
  - Arquivo: `src/components/dashboard/dialogDocumentRegister.tsx`
  - Modal de upload de documentos.
  - Implementado na UI, mas ainda sem persistencia real conectada a API.
- `Settings` (pagina)
  - Arquivo: `src/app/dashboard/settings/page.tsx`
  - Implementa cards de acesso rapido e zona de perigo.
  - Inclui acesso à rota de contador e dados do MEI.

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

### MEI
Arquivo: `src/actions/mei.ts`

- `saveMeiAction`
  - Recebe dados de MEI via `FormData` (cnpj, companyName, fantasyName, ownerName, cpf, state, city, mainActivityCNAE, activityType, hasAccountant).
  - Valida `ActivityType`.
  - Sanitiza CNPJ e CPF utilizando apenas digitos.
  - Requer autenticacao via token.
  - Faz `POST /mei` ou atualizacao equivalente via `apiClient`.
  - Em sucesso, retorna mensagem de sucesso e dados salvos.
  - Trata erros 401/400 e situaçoes de sessão expirada.

### Contador
Arquivo: `src/actions/accountant.ts`

- `saveAccountantAction`
  - Valida nome, e-mail e telefone do contador.
  - Detecta se e criacao ou edicao com base em `initialAccountant` e `prevState?.data`.
  - Usa `POST /accountant` ou `PUT /accountant` conforme necessario.
  - Em sucesso, retorna `message` de atualizacao ou cadastro e `data` com o registro salvo.
  - Em erro, trata 400 e 401 com mensagens amigaveis.
- `getAccountant()`
  - Busca os dados do contador autenticado via `GET /accountant`.
  - Retorna `null` quando o contador nao existe.

### Receitas e documentos
Arquivo: `src/actions/documentsRevenue.ts`

- `CreateRevenue(formdata: FormData)`
  - Recebe `amount`, `type`, `date` e `note`.
  - Valida campos obrigatorios.
  - Envia para `POST /revenue` usando token autenticado.
  - Retorna `{ success: true }` ou mensagem de erro.
- `SearchHistory()`
  - Busca receitas via `GET /revenues`.
  - Retorna lista de receitas formatada em `RevenueType[]`.

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
8. Se a API confirmar o usuario, o dashboard e renderizado; em caso contrario, redireciona para `/login`.

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
- renderizar `Sidebar` no desktop e `MobileSidebar` no mobile
- renderizar `Header` em desktop
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
- `GET /accountant` - Recupera dados do contador
- `POST /accountant` - Cria dados do contador
- `PUT /accountant` - Atualiza dados do contador
- `POST /revenue` - Cria receita
- `GET /revenues` - Lista receita historica

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
- `Accountant`
  - `id?`
  - `name`
  - `email`
  - `phone`
  - `createdAt?`
- `RevenueType`
  - `id`
  - `amount`
  - `date`
  - `type`
  - `note`
  - `creatAt`
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
- Pagina `/dashboard/mei-data` esta funcional com `MeiDataForm` para cadastro e atualizacao dos dados do MEI.
- Rota `/dashboard/accountant` esta funcional com `FormAccountant` para cadastro de dados do contador.
- Pagina `/dashboard/monthlyHistory` exibe historico de receitas carregado via API.
- O dashboard principal inclui blocos de status, resumo mensal e modais de registro de receitas/documentos.
- As paginas `/dashboard/monthlyHistory`, `/dashboard/reports`, `/dashboard/settings`, `/dashboard/mei-data` e `/dashboard/accountant` existem e estao acessiveis.
- Suporte a temas com `next-themes` adicionado.
- Animacoes CSS via `tw-animate-css` para melhor experiencia visual.
- Novos tipos de dados estruturados para MEI e contador.
- Server Actions com tratamento robusto de erros (sessao expirada, validacao, erros 400/401).
- FormActionState padronizado para todas as server actions com suporte a mensagens e redirecionamentos opcionais.
- A funcionalidade de relatorios ainda e placeholder e a parte de upload/documentos ainda nao esta integrada ao backend.

## Historico de Mudancas Recentes

### Atualizacoes em Agosto de 2026

**Novas funcionalidades:**
- Cadastro e edicao de dados do contador em `/dashboard/accountant`.
- Modal de cadastro de receitas na dashboard principal com integracao a `CreateRevenue()`.
- Tabela de historico de receitas em `/dashboard/monthlyHistory` carregando `GET /revenues`.
- Cards de configuracao com acesso direto ao MEI e ao contador.
- Layout de dashboard com blocos dinâmicos para status, receitas e anexos.

**Server Actions adicionadas:**
- `saveAccountantAction` e `getAccountant` em `src/actions/accountant.ts`.
- `CreateRevenue` e `SearchHistory` em `src/actions/documentsRevenue.ts`.

**Tipos adicionados/atualizados:**
- `Accountant` com `name`, `email` e `phone`.
- `RevenueType` com `amount`, `date`, `type`, `note` e `creatAt`.

**Observações de implementação:**
- O fluxo principal de receitas ja esta parcialmente integrado ao backend.
- A parte de relatorios e documentos ainda precisa de integração e refinamento.
- O dashboard continua com alguns indicadores e totais mockados na interface, especialmente em `MeiStatus` e `RecordInvoices`.

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
- Frontend com autenticacao, dashboard protegido, formulario de MEI e novo fluxo de cadastro do contador
- Estrutura de tipos consolidada para suportar as próximas features do projeto
- Estrutura de tipos consolidada para suportar proximas features
