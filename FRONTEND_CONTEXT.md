# Contexto do frontend

Documento técnico do frontend `mei-em-dia`, revisado em outubro de 2026 a partir do código desta pasta e comparado com as rotas, schemas e respostas atuais do backend.

## Visão geral

Aplicação Next.js com App Router para autenticação, cadastro de dados do MEI e contador, registro e consulta mensal de receitas, além de um relatório mensal. A área `/dashboard` é protegida no servidor. Há interfaces visuais para documentos e algumas configurações que ainda não têm persistência.

Fluxo principal: registro/login → cookie de sessão HTTP-only → validação em `/me` → cadastro do MEI/contador → operações de receitas e consultas por mês.

## Stack e comandos

- Next.js `16.2.9`, React `19.2.4`, TypeScript 5 e Tailwind CSS 4.
- Componentes baseados em shadcn/ui, Radix UI e Base UI; notificações Sonner; ícones Lucide React.
- `date-fns` e React Day Picker estão instalados. `next-themes` também está instalado, mas não há `ThemeProvider` no layout.
- Scripts disponíveis: `npm run dev`, `npm run build` e `npm run start`. Não há script de testes ou lint no `package.json`.

## Estrutura

- `src/app/`: páginas e layouts do App Router; login e registro estão no grupo `(public)`.
- `src/actions/`: Server Actions de autenticação, MEI, contador e receitas.
- `src/components/form/`: formulários compartilhados de login, registro, MEI e contador.
- `src/components/dashboard/`: navegação, resumo, histórico e dialogs do dashboard.
- `src/app/dashboard/reports/_components/`: componente específico do relatório mensal.
- `src/components/ui/`: componentes de interface reutilizáveis.
- `src/context/`: estado compartilhado do período do dashboard.
- `src/lib/`: cliente HTTP, sessão, tipos e utilitários.

## Rotas e proteção

Públicas:

- `/`: chama `getUser()` e redireciona para `/dashboard` ou `/login`.
- `/login`: formulário de login.
- `/register`: formulário de cadastro.

Dashboard:

- `/dashboard`: status visual do MEI, resumo mensal, atalhos e alerta.
- `/dashboard/mei-data`: cadastro/edição de dados do MEI.
- `/dashboard/accountant`: cadastro/edição de contador.
- `/dashboard/monthlyHistory`: tabela mensal de receitas com ações de edição e exclusão.
- `/dashboard/reports`: relatório mensal com totais e lista de receitas para o mês selecionado.
- `/dashboard/settings`: cards de configurações e zona de perigo.

`src/app/dashboard/layout.tsx` chama `AuthenticatedUser()` antes de renderizar a área protegida. Não existe `middleware.ts`. O layout também monta `DashboardProvider`, sidebar desktop/mobile e cabeçalho.

## Autenticação e API

- `src/actions/auth.ts`: `registerAction` envia `POST /user`; `loginAction` envia `POST /session`; `logoutAction` remove o cookie e redireciona para `/login`. O backend responde `400` também para credenciais inválidas; o frontend reconhece a mensagem do backend e a apresenta como erro de credenciais.
- O token é guardado no cookie HTTP-only `token_MeiEmDia` por `src/lib/auth.ts`, com validade de sete dias, `sameSite: "lax"`, `path: "/"` e `secure` em produção. O token não deve ser exposto no cliente.
- `getUser()` consulta `GET /me`; `AuthenticatedUser()` redireciona para `/login` quando não encontra sessão válida.
- `src/lib/api.ts` centraliza `fetch`, concatena `NEXT_PUBLIC_API_URL`, define JSON como content type e envia `Authorization: Bearer` quando recebe token. Erros HTTP são lançados como `Error` com mensagem e status serializados.
- `NEXT_PUBLIC_API_URL` é necessária. O valor configurado localmente não é documentado aqui; não incluir segredos ou valores de ambiente neste arquivo.

## Funcionalidades implementadas

### MEI

`getMei()` consulta `GET /mei` sem cache e retorna `Mei | null`; o backend responde `null` com HTTP 200 quando ainda não existe cadastro. `saveMeiAction` cria com `POST /mei` ou atualiza com `PUT /mei`. Envia CNPJ/CPF apenas com dígitos, estado em maiúsculas e os campos de empresa, titular, localização, CNAE, atividade (`SERVICO`, `COMERCIO`, `MISTO`) e `hasAccountant`. A action valida presença e comprimentos básicos antes da chamada.

### Contador

`/dashboard/accountant` carrega MEI e contador em paralelo. Se `GET /mei` retornar `null`, redireciona para `/dashboard/mei-data`; se o MEI indicar que não possui contador, a tela apresenta esse estado e um link para atualizar os dados do MEI. `getAccountant()` consulta `GET /accountant` sem cache e trata `null` como ausência de cadastro. O formulário permite editar nome, e-mail e telefone e salva por `POST /accountant` ou `PUT /accountant`; o telefone é enviado somente com dígitos. E-mail e telefone são anuláveis no modelo do banco, mas obrigatórios pelos schemas atuais de escrita.

### Período e receitas

`DashboardProvider` mantém `selectedDate` como `Date | null`, inicia a data com o mês atual e persiste em `sessionStorage` sob `SELECTED_DATE`. O seletor permite janeiro de 2020 a dezembro de 2030. Dashboard, histórico e relatório consultam o mesmo período.

As Server Actions em `src/actions/documentsRevenue.ts` implementam:

- `CreateRevenue`: `POST /revenue` com `amount`, `date`, `type` e `note` opcional. Usa `parseBrazilianCurrency` de `src/lib/currency.ts` para validar e converter valores positivos no formato brasileiro para número.
- `SearchHistory(month, year)`: `GET /revenues?month={month}&year={year}`.
- `UpdateRevenue(id, formData)`: `PUT /revenue` com `id`, `amount`, `date`, `type` e `note`; aplica a mesma validação e conversão monetária da criação.
- `DeleteRevenue(id)`: `DELETE /revenue/remuv?revenue_id={id}`.

Tipos de receita usados pela interface: `VENDA`, `SERVICO` e `OUTROS`. A conversão aceita números inteiros e valores brasileiros com até duas casas decimais, incluindo separador de milhar, e bloqueia valores inválidos ou não positivos antes da chamada à API. Na edição, `formatBrazilianCurrency` exibe o valor retornado pela API no formato brasileiro. Valores da tabela e do relatório são exibidos em BRL e datas em formato brasileiro. A tabela de histórico mostra a lista do período e tem campo de busca apenas visual, sem filtragem. A edição abre dialog e mostra toast de sucesso/erro; a lista não recebe atualização explícita após editar. A exclusão pede confirmação e remove o item da lista local após sucesso, mas não apresenta feedback de erro/sucesso nessa tabela. O resumo da página inicial e o relatório calculam os agregados a partir da resposta de `SearchHistory`.

### Relatório

`MonthlyReport` carrega as receitas do mês selecionado, exibe estados de carregamento/erro/vazio e calcula valor total, quantidade e subtotais/contagens por tipo. O menu desktop/mobile aponta para `/dashboard/reports`, mas o atalho “Ver relatório mensal” em `HistoryButton` ainda usa `href=""`.

## Funcionalidades parciais ou sem integração

### Documentos

`DocumentRegister` é somente uma interface de dialog. O seletor de arquivo aceita JPG/JPEG/PNG/PDF, mas não aplica validação de tamanho; tipo, vínculo com receita e observação são controles visuais. Não há submit funcional, Server Action ou endpoint de persistência.

### Configurações e status

Em `/dashboard/settings`, os links de dados do MEI e contador funcionam. “Minha conta”, “Exportar dados”, “Plano” e “Segurança” apontam para `/`. O botão “Excluir conta” não tem handler nem integração. `MeiStatus` e `AlertMessage` exibem conteúdo estático; não consultam pendências reais.

## Contratos da API confirmados

- As rotas de receita estão alinhadas entre frontend e backend: `POST /revenue`, `PUT /revenue`, `GET /revenues?month=...&year=...` e `DELETE /revenue/remuv?revenue_id=...`. O backend também oferece `GET /revenue/:id`, mas o frontend atual não o consome.
- Criação e edição enviam `amount` como número positivo, `date` como string, `type` como `VENDA`, `SERVICO` ou `OUTROS`, e `note` opcional; a edição inclui `id`. A conversão brasileira é centralizada em `src/lib/currency.ts`.
- O banco usa `Decimal(10,2)` para `Revenue.amount`; o JSON do Prisma o serializa como string. Datas e `createdAt` são strings ISO no JSON. Listagem e consulta por ID incluem `meiId`; criação e atualização não o selecionam. `note` pode ser `null`.
- `GET /mei` retorna `null` com status 200 quando não há MEI; `GET /accountant` retorna `null` quando não há MEI ou contador. `fantasyName`, `email` e `phone` podem ser nulos no banco/respostas.
- Os tipos em `src/lib/types.ts` refletem os nomes de resposta `createdAt` e as nulabilidades acima. Os schemas atuais de escrita de contador continuam exigindo e-mail e telefone, embora as colunas correspondentes permitam `null`.

## Tipos e layout

`src/lib/types.ts` define `User`, `AuthUser`, `Mei`, `Accountant`, `RevenueType`, `RevenueCategory` e `FormActionState`. `RevenueType.amount` é string na resposta JSON do Prisma, apesar de ser enviado como número nas operações de escrita. O layout raiz define `lang="pt-BR"`, fontes Geist, metadados ainda genéricos (“Create Next App”) e o `Toaster` global do Sonner. Embora `next-themes` esteja instalado, a aplicação não está envolvida por um provider de tema.

## Pendências conhecidas

- Conectar o atalho de relatório e atualizar a tabela depois de editar uma receita.
- Implementar filtragem no campo de busca da tabela.
- Integrar upload de documentos quando houver contrato de backend.
- Implementar conta, exportação, plano, segurança e exclusão de conta quando definidos os fluxos e contratos.
- Substituir status/alertas estáticos por dados reais quando disponíveis.
- Decidir se o suporte a tema será mantido e configurar provider se necessário.
- Considerar testes automatizados quando a infraestrutura de testes for definida.
