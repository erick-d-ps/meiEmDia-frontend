# Endpoints do projeto MEI em Dia

Documentacao dos endpoints registrados atualmente pela API.

## Base URL
```text
http://localhost:3333
```

## Autenticacao
As rotas autenticadas exigem `Authorization: Bearer <token>`. O token e obtido em `POST /session` e validado por `isAuthenticated`.

## 1) POST /user
Cria um usuario.

### Body
```json
{
  "name": "Maria Souza",
  "email": "maria@email.com",
  "password": "123456"
}
```

Validacoes: `name` string com no minimo 3 caracteres; `email` string obrigatoria (sem validacao de formato); `password` string com no minimo 6 caracteres.

### Resposta de sucesso: 200
```json
{
  "id": "uuid",
  "name": "Maria Souza",
  "email": "maria@email.com",
  "createdAt": "2026-07-08T00:00:00.000Z"
}
```

Erros possiveis: `400` para validacao ou e-mail ja cadastrado.

## 2) POST /session
Autentica o usuario e retorna um JWT com expiracao de 30 dias.

### Body
```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

Validacoes: `email` string obrigatoria (sem validacao de formato); `password` string com no minimo 6 caracteres.

### Resposta de sucesso: 200
```json
{
  "id": "uuid",
  "name": "Maria Souza",
  "email": "maria@email.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Erros possiveis: `400` para validacao ou credenciais invalidas.

## 3) GET /me
Retorna os dados do usuario autenticado: `id`, `name`, `email` e `createdAt`.

Erros possiveis: `401` para token ausente/invalido; `400` se o usuario nao for encontrado.

## 4) POST /mei
Cria os dados de MEI do usuario autenticado.

### Body
```json
{
  "cnpj": "12345678000195",
  "companyName": "Empresa Exemplo LTDA",
  "fantasyName": "Empresa Exemplo",
  "ownerName": "Maria Souza",
  "cpf": "12345678901",
  "state": "SP",
  "city": "Sao Paulo",
  "mainActivityCNAE": "6201501",
  "activityType": "SERVICO",
  "hasAccountant": false
}
```

Validacoes: `cnpj` minimo 14; `companyName` minimo 3; `fantasyName` opcional, minimo 3 quando preenchido e aceita `""`; `ownerName` minimo 3; `cpf` minimo 11; `state` exatamente 2; `city` minimo 2; `mainActivityCNAE` minimo 4; `activityType` `SERVICO`, `COMERCIO` ou `MISTO`; `hasAccountant` booleano.

### Resposta de sucesso: 200
Retorna o MEI criado com `id` e os campos enviados.

Erros possiveis: `401` para autenticacao; `400` para validacao, usuario inexistente ou MEI ja cadastrado.

## 5) GET /mei
Retorna o MEI associado ao usuario autenticado, com `id`, `cnpj`, `companyName`, `fantasyName`, `ownerName`, `cpf`, `state`, `city`, `mainActivityCNAE`, `activityType` e `hasAccountant`. `fantasyName` pode ser `null`. Se o usuario ainda nao tiver MEI cadastrado, retorna `null` com status `200`.

Erros possiveis: `401` para autenticacao.

## 6) PUT /mei
Atualiza todos os dados do MEI. Usa as mesmas validacoes de `POST /mei`; todos os campos sao obrigatorios, exceto `fantasyName`. Retorna os campos atualizados e `updatedAt`.

## 7) PATCH /mei
Atualiza parcialmente o MEI. Todos os campos sao opcionais e um objeto vazio tambem e aceito. As validacoes sao as mesmas de `POST /mei` quando um campo e informado. Retorna os campos atualizados e `updatedAt`.

### Body
```json
{
  "fantasyName": "Novo Nome Fantasia",
  "hasAccountant": true
}
```

## 8) POST /accountant
Cria o contador vinculado ao MEI autenticado.

### Body
```json
{
  "name": "Joao Contador",
  "email": "joao@contabilidade.com",
  "phone": "11999999999"
}
```

Validacoes: `name` string com no minimo 3; `email` string obrigatoria (sem validacao de formato); `phone` string entre 10 e 11 caracteres.

### Resposta de sucesso: 200
Retorna `id`, `name`, `email`, `phone` e `createdAt`.

Erros possiveis: `401` para autenticacao; `400` para validacao, MEI inexistente ou contador ja cadastrado.

## 9) GET /accountant
Retorna o contador do MEI autenticado, com `name`, `email`, `phone` e `createdAt`. `email` e `phone` podem ser `null` em registros existentes. Se o usuario nao tiver MEI ou contador cadastrado, retorna `null` com status `200`.

Erros possiveis: `401` para autenticacao.

## 10) PUT /accountant
Atualiza completamente o contador. `name`, `email` e `phone` sao obrigatorios e seguem as validacoes de `POST /accountant`.

### Resposta de sucesso: 200
```json
{
  "name": "Joao Contador Atualizado",
  "email": "novo-email@contabilidade.com",
  "phone": "11988888888"
}
```

Erros possiveis: `401` para autenticacao; `400` para validacao, MEI inexistente ou contador ainda nao criado.

## 11) POST /revenue
Cria uma receita vinculada ao MEI autenticado.

### Body
```json
{
  "amount": 150.75,
  "date": "2026-03-16",
  "type": "VENDA",
  "note": "Receita de servico prestado"
}
```

Validacoes: `amount` numero positivo; `date` string conversivel em data; `type` `VENDA`, `SERVICO` ou `OUTROS`; `note` string opcional.

### Resposta de sucesso: 201
Retorna `id`, `amount`, `date`, `type`, `note` e `createdAt`. `amount` e um `Decimal` no banco e e serializado pelo Prisma como string no JSON; `date` e `createdAt` sao strings ISO e `note` pode ser `null`.

## 12) PUT /revenue
Atualiza completamente uma receita pertencente ao MEI autenticado.

### Body
```json
{
  "id": "1c4a0f91-f17f-4a8a-8f43-37c8a4f0f6cf",
  "amount": 200.5,
  "date": "2026-03-20",
  "type": "SERVICO",
  "note": "Receita atualizada"
}
```

Validacoes: `id` UUID obrigatorio; `amount` positivo; `date` valida; `type` `VENDA`, `SERVICO` ou `OUTROS`; `note` string, `null` ou ausente.

### Resposta de sucesso: 200
Retorna `id`, `amount`, `date`, `type`, `note` e `createdAt`. `amount` e um `Decimal` no banco e e serializado pelo Prisma como string no JSON; `date` e `createdAt` sao strings ISO e `note` pode ser `null`.

Erros possiveis: `401` para autenticacao; `400` para validacao, MEI/receita inexistente ou receita pertencente a outro usuario.

## 13) GET /revenues
Lista as receitas do MEI do usuario autenticado. Nao exige `meiId`.

### Query params opcionais
- `month`: numero do mes, usado junto com `year`
- `year`: ano, usado junto com `month`

```text
GET /revenues
GET /revenues?month=3&year=2026
```

O filtro e aplicado somente quando `month` e `year` sao informados; os valores sao convertidos com `Number()` e nao ha validacao de faixa ou formato. Por exemplo, `month=3&year=2026` filtra de 1 de marco (inclusive) ate 1 de abril (exclusive). Retorna uma lista com `id`, `meiId`, `amount`, `type`, `date`, `note` e `createdAt`. `amount` e serializado como string pelo Prisma; `date` e `createdAt` sao strings ISO e `note` pode ser `null`.

Erros possiveis: `401` para autenticacao; `400` se usuario/MEI nao for encontrado ou ocorrer falha na consulta.

## 14) GET /revenue/:id
Busca uma receita especifica, somente se pertencer ao MEI autenticado.

```text
GET /revenue/1c4a0f91-f17f-4a8a-8f43-37c8a4f0f6cf
```

Retorna `id`, `meiId`, `amount`, `date`, `type`, `note` e `createdAt`. `amount` e serializado como string pelo Prisma; `date` e `createdAt` sao strings ISO e `note` pode ser `null`.

Erros possiveis: `401` para autenticacao; `400` para ID/MEI/receita inexistente ou falta de autorizacao.

## 15) DELETE /revenue/remuv
Exclui uma receita pertencente ao MEI autenticado. O caminho registrado atualmente e `/revenue/remuv`.

### Query param obrigatorio
```text
revenue_id=<uuid-da-receita>
```

```text
DELETE /revenue/remuv?revenue_id=1c4a0f91-f17f-4a8a-8f43-37c8a4f0f6cf
```

### Resposta de sucesso: 200
```json
{
  "message": "Receita deletada com sucesso!"
}
```

Erros possiveis: `401` para autenticacao; `400` para validacao, MEI/receita inexistente, falta de autorizacao ou falha ao deletar.

## Observacoes gerais
- A API usa JSON, CORS e a porta definida por `PORT`, com `3333` como padrao.
- `validateSchema` valida body, query e params e retorna `400` com detalhes quando o Zod falha.
- O middleware global retorna `400` para instancias de `Error`; falhas inesperadas retornam `500`.
