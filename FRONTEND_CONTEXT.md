# FRONTEND_CONTEXT

Documento tecnico do frontend do projeto `mei-em-dia`, atualizado em setembro de 2026 a partir do codigo presente na pasta `frontend`.

## Visao geral

O frontend e uma aplicacao Next.js com App Router para autenticacao de usuarios MEI, cadastro dos dados empresariais, cadastro opcional de contador, lancamento de receitas e consulta do historico mensal.

O fluxo principal implementado e:

1. O usuario cria uma conta ou realiza login.
2. O token retornado pela API e salvo em cookie HTTP-only.
3. O layout de `/dashboard` valida a sessao no servidor antes de renderizar a area protegida.
4. O usuario pode cadastrar ou editar os dados do MEI.
5. Se o MEI indicar que possui contador, o usuario pode cadastrar ou editar os dados do contador.
6. O usuario seleciona mes e ano e registra receitas para o periodo.
7. O dashboard e o historico consultam as receitas do periodo selecionado.

## Tecnologias e dependencias

- Next.js `16.2.9` com App Router
- React `19.2.4`
- TypeScript `5`
- Tailwind CSS `4`
- Shadcn/ui, Radix UI e Base UI
- Server Actions
- `next/navigation`, `next/headers` e `next/font`
- `next-themes` instalado, mas sem provider configurado no layout raiz
- Sonner para notificacoes toast
- Lucide React para icones
- React Day Picker e `date-fns` para componentes de data
- `class-variance-authority`, `clsx` e `tailwind-merge`
- `tw-animate-css` para animacoes CSS

Scripts disponiveis em `package.json`:

- `npm run dev`
- `npm run build`
- `npm run start`

## Estrutura de pastas

- `src/app/`: rotas, paginas e layouts do App Router.
- `src/actions/`: Server Actions para autenticacao, MEI, contador e receitas.
- `src/components/form/`: formularios de login, cadastro, MEI e contador.
- `src/components/dashboard/`: sidebar, header, status, receitas, historico e dialogs.
- `src/components/ui/`: primitives reutilizaveis baseadas em Shadcn/Radix/Base UI.
- `src/context/`: estado compartilhado do periodo selecionado no dashboard.
- `src/lib/`: cliente HTTP, autenticacao, tipos e utilitarios.
- `public/`: arquivos estaticos.

## Rotas

### Rotas publicas

- `/`: consulta `getUser()` e redireciona para `/dashboard` quando ha sessao valida ou `/login` quando nao ha.
- `/login`: renderiza `FormLogin` e redireciona usuarios autenticados para o dashboard.
- `/register`: renderiza `FormRegister`.

### Rotas protegidas

- `/dashboard`: dashboard principal com status do MEI, resumo de receitas, atalhos e alertas.
- `/dashboard/mei-data`: cadastro e edicao dos dados do MEI.
- `/dashboard/accountant`: cadastro e edicao dos dados do contador.
- `/dashboard/monthlyHistory`: historico de receitas do mes selecionado.
- `/dashboard/reports`: pagina existente, mas ainda e apenas um placeholder.
- `/dashboard/settings`: cards de configuracoes e zona de perigo.

A protecao e aplicada em `src/app/dashboard/layout.tsx` por meio de `AuthenticatedUser()`. Nao existe `middleware.ts`.

## Funcionalidades implementadas

### Autenticacao

- Registro com nome, e-mail e senha via `POST /user`.
- Login via `POST /session`.
- Token salvo no cookie HTTP-only `token_MeiEmDia`.
- Logout remove o cookie e redireciona para `/login`.
- Tratamento especifico para erros 400 e 401 no login.
- Redirect client-side apos sucesso usando `router.replace()` nos formularios.
- Validacao server-side do usuario autenticado via `GET /me` antes do dashboard.

Arquivos principais: `src/actions/auth.ts`, `src/lib/auth.ts`, `src/components/form/loginForm.tsx` e `src/components/form/registerForm.tsx`.

### Cadastro e edicao do MEI

`MeiDataForm` permite informar:

- CNPJ
- Razao social
- Nome fantasia opcional
- Nome do proprietario
- CPF
- Estado e cidade
- CNAE principal
- Tipo de atividade: `SERVICO`, `COMERCIO` ou `MISTO`
- Se possui contador

`saveMeiAction`:

- Usa `POST /mei` para criacao e `PUT /mei` para edicao.
- Sanitiza CNPJ e CPF mantendo apenas digitos.
- Normaliza o estado para maiusculas.
- Valida campos obrigatorios, tamanhos minimos, tipo de atividade e presenca de contador.
- Mantem os dados retornados no estado da Server Action.
- Trata sessao expirada e erros HTTP 400/401.

O formulario tambem envia automaticamente o valor de `hasAccountant` quando a opcao e alterada.

### Cadastro e edicao do contador

`/dashboard/accountant` busca os dados do MEI e do contador em paralelo usando `Promise.all`.

`FormAccountant`:

- Exige que o MEI esteja configurado com `hasAccountant = true`.
- Exibe orientacao e link para `/dashboard/mei-data` quando o MEI informa que nao possui contador.
- Permite editar nome, e-mail e telefone.
- Valida nome, formato de e-mail e telefone com DDD.
- Usa `POST /accountant` na criacao e `PUT /accountant` na edicao.
- Exibe estados de salvamento, sucesso e erro.

### Receitas

`CreateRevenue` registra receitas via `POST /revenue` com:

- valor
- data
- tipo: `VENDA`, `SERVICO` ou `OUTROS`
- observacao opcional

O dialog `RevenueRegister` abre o formulario de lancamento e exibe feedback com Sonner. O componente `UpdateRevenue` tambem existe e e usado no menu da tabela, mas atualmente reutiliza `CreateRevenue`; portanto, ainda nao atualiza um registro existente.

`SearchHistory(month, year)` consulta `GET /revenues?month={month}&year={year}`.

### Resumo mensal e historico

`DashboardProvider` compartilha `selectedDate` entre header, sidebar mobile, dashboard e historico.

`MonthSelector`:

- Permite selecionar mes de janeiro de 2020 a dezembro de 2030.
- Usa `date-fns` com localidade `pt-BR`.
- Persiste a selecao em `sessionStorage` com a chave `SELECTED_DATE`.
- Ignora falhas de leitura ou escrita do storage e usa a data atual como fallback.

`RecordInvoices` consulta o periodo selecionado e apresenta:

- receita total formatada em BRL
- quantidade total de lancamentos
- quantidade de servicos
- quantidade de vendas
- quantidade de outros lancamentos
- acao para adicionar receita
- acao para abrir o dialog de anexar documento

`RevenueTable` apresenta o historico do periodo com data, descricao, categoria, valor e menu de acoes. A busca visual ainda nao possui estado ou filtragem. A acao `Excluir` ainda nao possui handler ou endpoint. A acao `Editar` abre `UpdateRevenue`, mas o fluxo atual cria uma nova receita em vez de atualizar a selecionada.

### Documentos

`DocumentRegister` possui a interface para:

- selecionar arquivo JPG, PNG ou PDF de ate 5 MB
- selecionar tipo de documento
- vincular opcionalmente a uma receita
- informar observacao

O formulario ainda nao possui `onSubmit`, Server Action ou endpoint de persistencia. O cancelamento tambem e apenas visual no estado atual.

### Configuracoes

`/dashboard/settings` possui:

- acesso funcional aos dados do MEI
- acesso funcional ao cadastro do contador
- cards visuais para minha conta, exportacao de dados, plano e seguranca
- zona de perigo com botao de exclusao de conta

Os cards de minha conta, exportacao, plano e seguranca apontam para `/`, e a exclusao de conta ainda nao possui handler ou integracao com API.

## Componentes de dashboard

- `Sidebar`: menu desktop com Inicio, Historico de meses, Relatorios e Configuracoes, alem do logout.
- `MobileSidebar`: menu mobile em `Sheet`, com saudacao, seletor de mes e navegacao.
- `Header`: saudacao do usuario e seletor de mes no desktop.
- `MeiStatus`: status visual atualmente estatico, sem consulta real de pendencias.
- `AlertMessage`: bloco de alerta do dashboard.
- `HistoryButton`: atalhos para relatorio mensal e historico; o relatorio ainda usa `href=""`.
- `RevenueRegister`: dialog funcional para criacao de receita.
- `UpdateRevenue`: dialog presente no menu de historico, mas sem atualizacao real.
- `DocumentRegister`: dialog visual de upload, sem persistencia.
- `RevenueTable`: tabela do historico mensal.
- `RecordInvoices`: resumo agregado do periodo selecionado.

## Server Actions e endpoints

### `src/actions/auth.ts`

- `registerAction`: `POST /user`.
- `loginAction`: `POST /session` e salva o token.
- `logoutAction`: remove o token e redireciona.

### `src/actions/mei.ts`

- `getMei`: `GET /mei` sem cache.
- `saveMeiAction`: `POST /mei` ou `PUT /mei`.

### `src/actions/accountant.ts`

- `getAccountant`: `GET /accountant` sem cache.
- `saveAccountantAction`: `POST /accountant` ou `PUT /accountant`.

### `src/actions/documentsRevenue.ts`

- `CreateRevenue`: `POST /revenue`.
- `SearchHistory`: `GET /revenues?month={month}&year={year}`.

Nao ha endpoints de receita para atualizar ou excluir documentados no frontend, nem endpoint de documentos, exportacao ou exclusao de conta sendo consumido atualmente.

## API client

`src/lib/api.ts` centraliza chamadas HTTP:

- concatena `NEXT_PUBLIC_API_URL` ao endpoint;
- envia `Content-Type: application/json`;
- adiciona `Authorization: Bearer <token>` quando um token e informado;
- suporta `cache: "no-store"` e opcoes `next`;
- transforma respostas HTTP nao-OK em `Error` com `message` e `status` serializados.

## Tipos principais

Em `src/lib/types.ts`:

- `User`: id, nome, e-mail e data de criacao.
- `AuthUser`: dados do usuario autenticado e token.
- `ActivityType`: `SERVICO | COMERCIO | MISTO`.
- `Mei`: dados cadastrais e indicacao de contador.
- `Accountant`: nome, e-mail, telefone e metadados opcionais.
- `RevenueType`: id, valor, data, tipo, observacao e data de criacao.
- `FormActionState`: estado padronizado com sucesso, erro, mensagem e redirect opcional.

## Layout e notificacoes

O layout raiz define idioma `pt-BR`, fontes Geist e metadados basicos. O `Toaster` do Sonner e renderizado globalmente no `src/app/layout.tsx`.

Embora `next-themes` esteja instalado e o componente `src/components/ui/sonner.tsx` leia o tema, o layout ainda nao envolve a aplicacao com um `ThemeProvider`; portanto, o suporte a troca de tema nao esta configurado como funcionalidade de produto.

## Variaveis de ambiente

- `NEXT_PUBLIC_API_URL`: URL base da API, usada por `apiClient`.
- `NODE_ENV`: controla a flag `secure` do cookie de autenticacao em `src/lib/auth.ts`.

O valor local documentado de `NEXT_PUBLIC_API_URL` e `http://localhost:3333`.

## Pendencias conhecidas

- Implementar a pagina de relatorios e conectar o atalho do dashboard.
- Implementar busca e filtragem na tabela de receitas.
- Implementar atualizacao real de receitas e passar o registro selecionado ao dialog de edicao.
- Implementar exclusao de receitas, se suportada pela API.
- Conectar upload de documentos ao backend, incluindo estado de arquivo, tipo, vinculo e observacao.
- Implementar configuracoes de conta, exportacao, plano e seguranca.
- Implementar exclusao de conta com confirmacao e integracao segura.
- Tornar o status do MEI e os alertas baseados em dados reais.
- Configurar `ThemeProvider` caso o suporte a temas seja mantido.
- Adicionar testes automatizados para Server Actions, autenticacao, formularios e agregacao mensal.
