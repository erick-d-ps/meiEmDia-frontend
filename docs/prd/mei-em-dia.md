# PRD — MEI em Dia

> Tipo: PRD inicial · Data: 2026-10-08  
> **Status:** Aguardando implementação

## 1. Visão geral

O MEI em Dia é uma aplicação web para que microempreendedores individuais mantenham seus dados empresariais e de contador e registrem suas receitas. A área autenticada reúne um resumo do mês selecionado, histórico de receitas e um relatório mensal.

Este PRD registra o comportamento funcional observado no frontend atual, para servir como referência do produto existente. Não transforma telas sem integração em compromissos de produto.

## 2. Problema que resolve

MEIs precisam consultar e manter em um só lugar informações básicas da empresa, contato do contador e receitas registradas ao longo do mês. O produto oferece formulários para esses dados e consultas mensais, reduzindo a dependência de anotações dispersas.

O frontend ainda não acompanha obrigações fiscais reais nem apresenta status de conformidade baseado em dados do negócio.

## 3. Público-alvo

Microempreendedores individuais que desejam registrar e consultar dados empresariais, informações do contador e receitas por mês.

## 4. Objetivo do recorte atual

Descrever e consolidar os fluxos atualmente integrados: criação de conta e autenticação, manutenção dos dados do MEI e do contador, registro e manutenção de receitas e consulta de resumo e relatório mensal.

O comportamento descrito reflete o frontend existente e os contratos registrados em `endpoints.md`. A documentação atual da API cobre as chamadas de criação, listagem mensal, edição e exclusão usadas pelo frontend.

## 5. Funcionalidades

**Essenciais:**

- Criar conta e entrar com e-mail e senha; encerrar a sessão.
- Proteger a área do dashboard e direcionar usuários sem sessão válida para o login.
- Consultar e cadastrar ou editar os dados cadastrais do MEI.
- Consultar e cadastrar ou editar os dados do contador vinculado ao MEI.
- Selecionar mês e ano para consultar receitas.
- Cadastrar, editar e excluir receitas com valor, data, categoria e descrição opcional.
- Exibir resumo e relatório mensal com total, quantidade e agrupamentos por categoria.

**Desejáveis:**

- Não se aplica a este recorte de documentação do estado atual. Não foram incluídas funcionalidades futuras como compromissos de implementação.

## 6. Fora do escopo

- Upload, armazenamento ou vínculo de documentos a receitas. A interface de cadastro de documentos não tem envio funcional nem persistência.
- Busca/filtragem efetiva na tabela de receitas; o campo de busca é apenas visual.
- Dados reais de pendências, conformidade, alertas ou status fiscal. Os componentes atuais são estáticos.
- Gestão de conta, exportação de dados, plano, segurança e exclusão de conta. Os cartões e ações correspondentes não têm fluxo integrado.
- Persistência de tema visual.
- Definição ou alteração de contratos da API de receitas sem validação com o backend.
- Testes automatizados como requisito de aceite; o projeto não possui suíte configurada atualmente.

## 7. Regras de negócio

- Cada usuário autenticado consulta e altera os dados associados à própria conta e ao próprio MEI, conforme os fluxos autenticados existentes.
- Para salvar os dados do MEI, são exigidos CNPJ, razão social, titular, CPF, estado, cidade, CNAE principal, tipo de atividade e indicação de contador. Nome fantasia é opcional. O tipo de atividade é serviço, comércio ou misto.
- O formulário do contador exige nome, e-mail e telefone com DDD. O fluxo de contador depende de o MEI indicar que possui contador.
- Uma receita contém valor, data e categoria; descrição é opcional. As categorias disponíveis são venda, serviço e outros.
- A consulta mensal usa o período selecionado no dashboard, compartilhado entre o resumo, histórico e relatório.
- A interface pede confirmação antes de excluir uma receita. Após sucesso, remove o item da lista local.
- Não há regra de limite anual, emissão fiscal, cálculo de imposto ou validação de obrigação fiscal implementada neste frontend.
- Os contratos documentados para receitas são: criação em `POST /revenue`, listagem própria opcionalmente filtrada por mês e ano em `GET /revenues`, atualização completa em `PUT /revenue` e exclusão por `DELETE /revenue/remuv?revenue_id=...`.

## 8. Fluxos principais

### Fluxo 1 — Criar conta e entrar

1. A pessoa preenche nome, e-mail e senha no cadastro.
2. O sistema envia o cadastro e, quando concluído, encaminha a pessoa para o login.
3. A pessoa informa e-mail e senha.
4. Em caso de sucesso, o sistema inicia sessão e abre o dashboard.
5. Ao encerrar sessão, o sistema remove a sessão e encaminha ao login.

### Fluxo 2 — Manter dados do MEI e do contador

1. A pessoa autenticada abre os dados do MEI.
2. Se ainda não houver cadastro, preenche os dados e salva; caso já exista, edita e salva as alterações.
3. Se informar que possui contador, abre a seção de contador e consulta ou cadastra os dados.
4. Pode editar nome, e-mail e telefone do contador e salvar.

### Fluxo 3 — Registrar e consultar receitas do mês

1. A pessoa seleciona mês e ano no período compartilhado do dashboard.
2. Consulta a lista de receitas daquele período e os totais exibidos no resumo ou relatório.
3. Para registrar uma receita, informa valor, data, categoria e, opcionalmente, uma descrição.
4. Para editar, altera os campos no diálogo de edição e salva.
5. Para excluir, confirma a ação; após sucesso, o item é removido da lista.

## 9. Critérios de aceite

- A pessoa consegue criar uma conta com nome, e-mail e senha e recebe retorno de erro quando o cadastro falha.
- A pessoa consegue iniciar e encerrar sessão; uma sessão inválida não permite renderizar a área protegida.
- A pessoa consegue cadastrar ou atualizar os dados do MEI, com validações dos campos obrigatórios e mensagens de falha.
- A pessoa consegue cadastrar ou atualizar os dados do contador quando o MEI indica que possui contador.
- A pessoa consegue selecionar o mês e ano e consultar as receitas correspondentes nos fluxos de dashboard, histórico e relatório.
- A pessoa consegue registrar uma receita com valor, data e categoria; a descrição pode ficar vazia.
- A pessoa consegue editar uma receita e recebe retorno visual de sucesso ou erro no diálogo.
- A pessoa precisa confirmar a exclusão de uma receita; se a operação tiver sucesso, ela deixa de aparecer na lista atual.
- O relatório mensal apresenta estados de carregamento, erro e ausência de receitas, e calcula total, quantidade e agrupamentos por tipo a partir das receitas retornadas.
- As telas de documentos, configurações não integradas e status estático não são apresentadas como operações persistidas ou dados reais.
- As chamadas de listagem, edição e exclusão de receitas correspondem aos caminhos e parâmetros atualmente descritos em `endpoints.md`.

## 10. Stack

Aplicação web com Next.js App Router, React, TypeScript e Tailwind CSS. A interface usa componentes baseados em shadcn/ui, Radix UI e Base UI. O frontend integra com uma API HTTP para autenticação, dados do MEI, contador e receitas.

## 11. Justificativa da stack

A stack já está em uso no projeto e suporta páginas web com renderização no servidor, interações no cliente e comunicação com a API existente. Este PRD preserva essa base e não propõe novas tecnologias.

## 12. Fases de construção

As fases abaixo organizam os fluxos que compõem o estado funcional documentado; não significam que sejam funcionalidades novas.

### Fase 1 — Acesso e cadastro empresarial

Objetivo: permitir acesso autenticado e manutenção dos dados básicos do negócio.

Specs:

- Spec 01 — Cadastro, login e sessão
- Spec 02 — Dados do MEI e do contador

### Fase 2 — Receitas e acompanhamento mensal

Objetivo: registrar receitas e consultar resultados do período selecionado.

Specs:

- Spec 03 — Registro e manutenção de receitas
- Spec 04 — Período, histórico e relatório mensal

## 13. Specs funcionais detalhadas

### Spec 01 — Cadastro, login e sessão

- **Fase:** Fase 1 — Acesso e cadastro empresarial
- **Objetivo (o quê):** Permitir criação de conta, autenticação e encerramento da sessão.
- **Intenção (por quê):** Restringir dados empresariais e financeiros à pessoa autenticada.
- **Contexto:** O produto possui páginas públicas de cadastro e login e uma área autenticada.
- **Atores:** Pessoa visitante e pessoa com conta.
- **Descrição do comportamento:** O cadastro recebe nome, e-mail e senha e envia os dados para criação da conta. Após sucesso, direciona ao login. O login recebe e-mail e senha; em sucesso, inicia sessão e direciona ao dashboard. Erros de credenciais e validação são apresentados como mensagens; credenciais inválidas são reconhecidas pela mensagem do backend, que responde com status 400. Ao sair, a sessão é encerrada e a pessoa volta ao login. Ao acessar uma rota protegida sem sessão válida, deve ser direcionada ao login.
- **Entradas e saídas:** Nome, e-mail e senha no cadastro; e-mail e senha no login. Saídas: confirmação ou mensagem de erro e navegação para login ou dashboard.
- **Dados/entidades envolvidos (conceitual):** Conta de usuário com nome, e-mail e credencial; sessão autenticada.
- **Estados e transições:** Visitante → cadastro concluído → login; pessoa não autenticada → login bem-sucedido → área autenticada; pessoa autenticada → logout → login.
- **Regras de negócio:** Credenciais inválidas não iniciam sessão. A sessão deve permanecer protegida e não ser exposta à interface cliente.
- **Validações:** Nome, e-mail e senha são campos de cadastro; login exige e-mail e senha. A API pode rejeitar e-mail já cadastrado, formato ou credenciais inválidas.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa abre cadastro e informa os dados solicitados.
  2. O sistema confirma o cadastro ou apresenta o erro recebido.
  3. A pessoa abre login e informa e-mail e senha.
  4. Em caso de sucesso, o sistema abre o dashboard; em caso de falha, mantém o formulário e apresenta uma mensagem.
  5. A pessoa pode encerrar sessão pelo controle de logout.
- **Casos de borda e erros:** E-mail duplicado ou dados rejeitados mostram erro e não prosseguem; credenciais inválidas mostram erro e não autenticam; sessão ausente ou inválida impede o acesso à área protegida.
- **Impacto no existente:** Define os fluxos públicos e a barreira de acesso já usados pelas demais specs.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a pessoa informa dados aceitos, quando conclui cadastro, então recebe confirmação e pode seguir ao login.
  - Dado que a pessoa informa credenciais válidas, quando entra, então chega à área autenticada.
  - Dado que a pessoa informa credenciais inválidas, quando tenta entrar, então recebe erro e não obtém acesso.
  - Dado que o backend retorna status 400 com a mensagem de credenciais inválidas, quando o login falha, então a interface informa que o e-mail ou a senha estão incorretos.
  - Dado que não existe sessão válida, quando a pessoa acessa uma área protegida, então é encaminhada ao login.
  - Dado que a pessoa está autenticada, quando encerra sessão, então volta ao login e perde acesso protegido.
- **Definição de pronto:** Cadastro, login, logout e barreira de acesso apresentam os resultados e erros descritos.
- **Dependências:** Nenhuma.
- **Fora do escopo desta spec:** Recuperação de senha, autenticação multifator, gestão de perfil e exclusão de conta.

### Spec 02 — Dados do MEI e do contador

- **Fase:** Fase 1 — Acesso e cadastro empresarial
- **Objetivo (o quê):** Consultar e manter os dados cadastrais do MEI e, quando aplicável, do contador.
- **Intenção (por quê):** Manter os dados básicos do negócio disponíveis para a própria pessoa e contextualizar os registros de receita.
- **Contexto:** O cadastro só pode ser usado por pessoa autenticada. O contador está associado ao MEI e seu fluxo depende da indicação de contador.
- **Atores:** Pessoa autenticada responsável pelo MEI.
- **Descrição do comportamento:** Ao abrir a seção do MEI, o sistema carrega os dados existentes. Se não houver, mostra formulário de cadastro; caso haja, permite edição. O formulário cobre identificação da empresa, titular, localização, CNAE, atividade e indicação de contador. Se a pessoa indicar contador, pode abrir a seção de contador, consultar os dados existentes ou cadastrar nome, e-mail e telefone; se já houver registro, pode editá-lo. Se acessar a seção do contador sem MEI cadastrado, é direcionada ao cadastro do MEI; se o MEI indicar que não possui contador, a tela informa isso e oferece acesso para atualizar os dados do MEI. Sucesso ou falha de salvamento deve ser comunicado.
- **Entradas e saídas:** Dados do MEI: CNPJ, razão social, nome fantasia opcional, titular, CPF, estado, cidade, CNAE, tipo de atividade e existência de contador. Dados do contador: nome, e-mail e telefone. Saída: dados salvos ou mensagem de validação/erro.
- **Dados/entidades envolvidos (conceitual):** Perfil empresarial do MEI e contato do contador vinculado.
- **Estados e transições:** MEI ausente → formulário de cadastro → MEI salvo; MEI existente → formulário preenchido → MEI atualizado. Contador ausente com indicação habilitada → cadastro → contador salvo; contador existente → edição → contador atualizado.
- **Regras de negócio:** Tipo de atividade aceita serviço, comércio ou misto. Nome fantasia é opcional. Dados de contador só são pertinentes quando o MEI indica que possui contador.
- **Validações:** CNPJ e CPF devem conter ao menos 14 e 11 dígitos respectivamente; razão social e titular, ao menos 3 caracteres; estado, 2 caracteres; cidade, ao menos 2; CNAE, ao menos 4. Nome do contador, ao menos 3 caracteres; e-mail em formato válido; telefone com 10 ou 11 dígitos.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa autenticada abre os dados do MEI.
  2. O sistema carrega dados existentes ou apresenta o formulário vazio.
  3. A pessoa preenche ou altera os campos e salva.
  4. A pessoa indica se possui contador.
  5. Se houver contador, abre a seção correspondente, consulta ou preenche os dados e salva.
- **Casos de borda e erros:** Sem sessão válida, não deve concluir salvamento; dados inválidos devem indicar erro e preservar os dados já exibidos quando possível; ausência de MEI ao acessar a seção de contador redireciona para o cadastro do MEI; MEI sem contador habilitado mostra o estado informativo; erro de rede ou API deve ser informado.
- **Impacto no existente:** Alimenta as telas de MEI e contador e fornece o vínculo empresarial esperado nas operações autenticadas.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que não existe MEI, quando a pessoa abre a seção, então pode preencher e salvar os dados obrigatórios.
  - Dado que existe MEI, quando a pessoa abre a seção, então os dados são apresentados e podem ser atualizados.
  - Dado que há campos obrigatórios inválidos, quando a pessoa salva, então o sistema impede o envio e apresenta erro.
  - Dado que o MEI indica possuir contador, quando a pessoa abre a seção de contador, então pode cadastrar ou atualizar nome, e-mail e telefone.
  - Dado que a pessoa abre a seção de contador sem possuir MEI, quando a página carrega, então é direcionada ao cadastro do MEI.
  - Dado que a API rejeita o salvamento, quando a operação termina, então a pessoa recebe uma mensagem de erro.
- **Definição de pronto:** Consulta, criação e atualização do MEI e do contador cobrem estados vazio, preenchido, sucesso e erro com as validações acima.
- **Dependências:** Spec 01 — é necessário estar autenticado.
- **Fora do escopo desta spec:** Alterar dados de usuário, consultar situação cadastral em órgãos públicos, validar CNAE em fonte externa ou executar obrigações fiscais.

### Spec 03 — Registro e manutenção de receitas

- **Fase:** Fase 2 — Receitas e acompanhamento mensal
- **Objetivo (o quê):** Cadastrar, editar e excluir receitas associadas ao MEI autenticado.
- **Intenção (por quê):** Dar à pessoa uma forma consistente de registrar entradas financeiras e manter o histórico correto.
- **Contexto:** A interface oferece formulário de cadastro, diálogo de edição e confirmação de exclusão. `endpoints.md` documenta os contratos atuais das quatro operações e seus parâmetros.
- **Atores:** Pessoa autenticada responsável pelo MEI.
- **Descrição do comportamento:** Para cadastrar, a pessoa informa valor, data, categoria e descrição opcional; após sucesso, recebe confirmação. Para editar, abre a receita selecionada, altera os campos e salva, recebendo confirmação ou erro. Para excluir, confirma a ação; após sucesso, o item é removido da lista exibida. A tabela não implementa busca efetiva. A lista não é atualizada explicitamente após edição no comportamento atual.
- **Entradas e saídas:** Valor positivo, data válida, categoria (venda, serviço ou outros) e descrição opcional. Saída: receita criada/atualizada/excluída ou mensagem de erro.
- **Dados/entidades envolvidos (conceitual):** Receita com valor, data, categoria e observação opcional, pertencente ao MEI da pessoa autenticada.
- **Estados e transições:** Formulário → enviando → sucesso com confirmação/fechamento; erro de validação ou API → mensagem e formulário disponível. Exclusão solicitada → confirmação → removida após sucesso ou permanece em caso de falha.
- **Regras de negócio:** O valor deve ser positivo; data deve ser válida; categoria deve corresponder a uma das três opções; observação é opcional. A receita deve pertencer ao MEI da pessoa autenticada.
- **Validações:** A API exige valor numérico positivo, data conversível em data e categoria entre venda, serviço e outros. Na edição, o identificador da receita também é obrigatório. A descrição é opcional na criação e aceita string, `null` ou ausência na atualização. O frontend aceita valores no formato brasileiro, com separador de milhar opcional e até duas casas decimais, converte-os em número e impede o envio de valores inválidos ou não positivos.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa autenticada abre o formulário de receita.
  2. Informa valor, data, categoria e, se desejar, descrição.
  3. Salva e recebe confirmação ou erro.
  4. Para editar, seleciona uma receita, altera seus dados e salva.
  5. Para excluir, seleciona a ação e confirma; o item sai da lista após sucesso.
- **Casos de borda e erros:** Campo obrigatório ausente impede o envio; valor monetário malformado, com mais de duas casas decimais ou não positivo impede a chamada à API, mantém o texto no formulário e apresenta erro; falha da API apresenta erro; falha na edição mantém a receita disponível; cancelamento da confirmação interrompe a exclusão; falha de exclusão não remove o item da lista.
- **Impacto no existente:** A tabela mensal e o relatório dependem dos dados retornados por estas operações; a lista não é atualizada explicitamente após edição no comportamento atual.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que valor, data e categoria são válidos, quando a pessoa salva, então a receita é enviada e o sucesso é informado.
  - Dado que a pessoa informa `500,00`, `1.500,50`, `10.000,99` ou `500`, quando salva, então o frontend envia respectivamente um número positivo equivalente para a API.
  - Dado que falta um campo obrigatório, quando tenta salvar, então a operação não é concluída e há mensagem de validação.
  - Dado que a pessoa edita uma receita, quando a API confirma a alteração, então recebe confirmação de sucesso.
  - Dado que a pessoa inicia a exclusão, quando cancela a confirmação, então a receita permanece.
  - Dado que a pessoa confirma e a API conclui a exclusão, então o item deixa a lista atual.
  - Dado que a API falha em qualquer operação, quando a ação termina, então o resultado não é apresentado como sucesso.
- **Definição de pronto:** Cadastro, edição e exclusão comunicam resultados corretos e respeitam os contratos já documentados; o tratamento da lista após editar é definido.
- **Dependências:** Spec 01 — sessão autenticada; Spec 02 — vínculo com o MEI.
- **Fora do escopo desta spec:** Anexar documentos, emitir nota fiscal, calcular impostos, importar extratos ou implementar busca na tabela.

### Spec 04 — Período, histórico e relatório mensal

- **Fase:** Fase 2 — Receitas e acompanhamento mensal
- **Objetivo (o quê):** Permitir selecionar um mês e consultar histórico e agregados das receitas desse período.
- **Intenção (por quê):** Ajudar a pessoa a acompanhar entradas do mês e revisar os lançamentos em uma visão resumida.
- **Contexto:** Dashboard, histórico e relatório usam o período compartilhado. O seletor cobre janeiro de 2020 a dezembro de 2030. Os dados do relatório vêm da consulta de receitas do período.
- **Atores:** Pessoa autenticada responsável pelo MEI.
- **Descrição do comportamento:** O período começa no mês atual e sua escolha é mantida durante a sessão do navegador. Ao mudar o mês/ano, as telas que dependem do período consultam as receitas correspondentes. O dashboard exibe resumo. O histórico apresenta a lista mensal e ações disponíveis. O relatório exibe total, quantidade, subtotais e contagens por categoria, lista de receitas e estados de carregamento, erro e vazio. Os valores são exibidos em reais e datas em formato brasileiro. A busca visível no histórico não filtra resultados.
- **Entradas e saídas:** Mês e ano selecionados. Saída: receitas do período, soma total, contagem geral e subtotais/contagens por categoria, ou estado vazio/erro.
- **Dados/entidades envolvidos (conceitual):** Período mensal; receitas do período; totais agregados por categoria.
- **Estados e transições:** Período selecionado → carregamento → dados exibidos; sem resultados → estado vazio; erro de consulta → mensagem/estado de erro. Alterar período inicia nova consulta.
- **Regras de negócio:** Dashboard, histórico e relatório compartilham o mês/ano selecionado; totais e contagens são calculados com base na lista retornada para esse período.
- **Validações:** A seleção deve estar dentro do intervalo disponível; respostas vazias devem ser tratadas como ausência de receitas e erros de consulta não devem ser exibidos como totais válidos.
- **Fluxo do usuário (passo a passo):**
  1. A pessoa autenticada escolhe um mês e ano disponíveis.
  2. O dashboard, histórico e relatório que estiverem abertos carregam o período selecionado.
  3. A pessoa consulta lista e totais; ao mudar o período, o conteúdo é atualizado.
  4. Em caso de erro ou ausência de registros, a tela comunica o estado correspondente.
- **Casos de borda e erros:** Período sem receitas mostra estado vazio; carregamento mostra indicação visual; falha na consulta mostra erro; categoria desconhecida não deve quebrar a apresentação. `GET /revenues` aceita `month` e `year` juntos como filtros opcionais; sem ambos, lista todas as receitas do MEI autenticado. O backend documenta que converte os valores com `Number()` sem validar faixa ou formato.
- **Impacto no existente:** Consolida a leitura das receitas e dirige o conteúdo do dashboard, histórico e relatório.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a pessoa seleciona um mês dentro do intervalo, quando abre histórico ou relatório, então vê dados daquele período.
  - Dado que o período selecionado não tem receitas, quando a consulta termina, então a tela mostra estado vazio.
  - Dado que há receitas, quando o relatório termina de carregar, então total, quantidade e agrupamentos correspondem à lista exibida.
  - Dado que a consulta falha, quando a tela recebe o erro, então apresenta estado de erro em vez de tratar o resultado como lista vazia válida.
  - Dado que a pessoa altera o mês, quando a nova consulta termina, então o conteúdo reflete o novo período.
- **Definição de pronto:** Seleção mensal é compartilhada e os estados vazio, carregando, erro e dados calculados são coerentes nas telas dependentes.
- **Dependências:** Spec 03 — receitas consultadas e operações de receitas; Spec 01 — acesso autenticado.
- **Fora do escopo desta spec:** Busca por texto, filtros adicionais, exportação de relatório, comparações entre períodos e projeções financeiras.

## 14. Ordem recomendada de implementação

1. Spec 01 — Cadastro, login e sessão
2. Spec 02 — Dados do MEI e do contador
3. Spec 03 — Registro e manutenção de receitas
4. Spec 04 — Período, histórico e relatório mensal

Essa sequência acompanha as dependências do produto: acesso precede os dados associados à pessoa; os dados empresariais dão contexto às receitas; e o histórico e o relatório dependem das receitas. Como o documento descreve o produto atual, a ordem é uma referência de dependências e não um plano de novas entregas.

## Suposições e pontos a confirmar

- Suposição adotada: o valor central do produto é organizar dados básicos do MEI e acompanhar receitas mensais; não há no frontend evidência de acompanhamento fiscal real.
- Confirmado pelo usuário: o público é MEI; cadastro/login fazem parte do escopo; recursos incompletos devem ser registrados como limitações; regras e fluxos devem refletir o comportamento atual.
- Os contratos de receitas em `endpoints.md` foram conferidos com as chamadas do frontend: criação `POST /revenue`, atualização `PUT /revenue`, listagem `GET /revenues?month=...&year=...` e exclusão `DELETE /revenue/remuv?revenue_id=...`. A documentação agora informa que `meiId` não é exigido e que os filtros mensais são opcionais.
- A entrada de valores monetários usa o formato brasileiro; cadastro e edição validam e convertem o valor antes de enviá-lo como número positivo, e a edição apresenta o valor existente formatado em pt-BR.
- O atalho “Ver relatório mensal” do histórico não leva atualmente à rota de relatório; a navegação pelo menu existe.
