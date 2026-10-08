# Contexto do frontend

Documento técnico do frontend `mei-em-dia`, revisado em outubro de 2026 a partir do código desta pasta. Descreve o comportamento observado no repositório; contratos de API que divergem de `endpoints.md` estão destacados para confirmação no backend.

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

- `src/actions/auth.ts`: `registerAction` envia `POST /user`; `loginAction` envia `POST /session`; `logoutAction` remove o cookie e redireciona para `/login`.
- O token é guardado no cookie HTTP-only `token_MeiEmDia` por `src/lib/auth.ts`, com validade de sete dias, `sameSite: "lax"`, `path: "/"` e `secure` em produção. O token não deve ser exposto no cliente.
- `getUser()` consulta `GET /me`; `AuthenticatedUser()` redireciona para `/login` quando não encontra sessão válida.
- `src/lib/api.ts` centraliza `fetch`, concatena `NEXT_PUBLIC_API_URL`, define JSON como content type e envia `Authorization: Bearer` quando recebe token. Erros HTTP são lançados como `Error` com mensagem e status serializados.
- `NEXT_PUBLIC_API_URL` é necessária. O valor configurado localmente não é documentado aqui; não incluir segredos ou valores de ambiente neste arquivo.

## Funcionalidades implementadas

### MEI

`getMei()` consulta `GET /mei` sem cache e trata HTTP 400 como ausência de cadastro. `saveMeiAction` cria com `POST /mei` ou atualiza com `PUT /mei`. Envia CNPJ/CPF apenas com dígitos, estado em maiúsculas e os campos de empresa, titular, localização, CNAE, atividade (`SERVICO`, `COMERCIO`, `MISTO`) e `hasAccountant`. A action valida presença e comprimentos básicos antes da chamada.

### Contador

`/dashboard/accountant` carrega MEI e contador em paralelo. `getAccountant()` consulta `GET /accountant` sem cache e trata como ausência apenas o erro 400 cuja mensagem indica contador não encontrado. O formulário exige `hasAccountant = true`, permite editar nome, e-mail e telefone e salva por `POST /accountant` ou `PUT /accountant`; o telefone é enviado somente com dígitos.

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

## Contratos que precisam de confirmação no backend

Há divergências entre `endpoints.md` e as chamadas atuais do frontend. Não alterar o contrato com base apenas neste documento; confirmar a implementação do backend antes de mudar:

- A documentação de `GET /revenues` descreve `meiId`; o frontend envia `month` e `year`.
- `endpoints.md` descreve somente `GET /revenue/:id` além de criação e listagem, sem documentar as chamadas de edição (`PUT /revenue`) e exclusão (`DELETE /revenue/remuv?revenue_id=...`). A rota `remuv` parece ter erro de grafia, mas isso não foi confirmado no backend.
- A exclusão usa query `revenue_id`, enquanto o formato de recurso por ID descrito na documentação é `/revenue/:id`.
- A conversão monetária de cadastro e edição é centralizada em `src/lib/currency.ts`; a API continua recebendo `amount` como número positivo.
- `RevenueType` em `src/lib/types.ts` tipa `amount` como `string` e nomeia a data de criação como `creatAt`; respostas e usos devem ser conferidos com o contrato real.

`endpoints.md` lista `POST /user`, `POST /session`, `GET /me`, operações de MEI e contador, e `POST /revenue`; consulte-o e o backend antes de alterar essas integrações. O arquivo pode estar desatualizado em relação às rotas de receitas consumidas.

## Tipos e layout

`src/lib/types.ts` define `User`, `AuthUser`, `Mei`, `Accountant`, `RevenueType` e `FormActionState`. O layout raiz define `lang="pt-BR"`, fontes Geist, metadados ainda genéricos (“Create Next App”) e o `Toaster` global do Sonner. Embora `next-themes` esteja instalado, a aplicação não está envolvida por um provider de tema.

## Pendências conhecidas

- Confirmar e documentar os contratos de listagem, atualização e exclusão de receitas com o backend.
- Corrigir a conversão de valores monetários e verificar os tipos de resposta de receita.
- Conectar o atalho de relatório e atualizar a tabela depois de editar uma receita.
- Implementar filtragem no campo de busca da tabela.
- Integrar upload de documentos quando houver contrato de backend.
- Implementar conta, exportação, plano, segurança e exclusão de conta quando definidos os fluxos e contratos.
- Substituir status/alertas estáticos por dados reais quando disponíveis.
- Decidir se o suporte a tema será mantido e configurar provider se necessário.
- Considerar testes automatizados quando a infraestrutura de testes for definida.
