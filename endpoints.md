# Endpoints do projeto MEI em Dia

Este documento reúne todos os endpoints atualmente disponíveis na API, com exemplos de request e response.

## Base URL
```text
http://localhost:3333
```

## 1) POST /user
### Objetivo
Criar um novo usuário.

### Headers
```http
Content-Type: application/json
```

### Body
```json
{
  "name": "Maria Souza",
  "email": "maria@email.com",
  "password": "123456"
}
```

### Validações
- name: string, mínimo 3 caracteres
- email: string
- password: string, mínimo 6 caracteres

### Resposta de sucesso (200)
```json
{
  "id": "uuid",
  "name": "Maria Souza",
  "email": "maria@email.com",
  "createdAt": "2026-07-08T00:00:00.000Z"
}
```

### Possíveis erros
- 400: validação do schema
- 400: Email já cadastrado

---

## 2) POST /session
### Objetivo
Autenticar um usuário e retornar um token JWT.

### Headers
```http
Content-Type: application/json
```

### Body
```json
{
  "email": "maria@email.com",
  "password": "123456"
}
```

### Validações
- email: string
- password: string, mínimo 6 caracteres

### Resposta de sucesso (200)
```json
{
  "id": "uuid",
  "name": "Maria Souza",
  "email": "maria@email.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Possíveis erros
- 400: validação do schema
- 400: Senha ou email invalido

---

## 3) GET /me
### Objetivo
Retornar os dados do usuário autenticado.

### Headers
```http
Authorization: Bearer <token>
```

### Resposta de sucesso (200)
```json
{
  "id": "uuid",
  "name": "Maria Souza",
  "email": "maria@email.com",
  "createdAt": "2026-07-08T00:00:00.000Z"
}
```

### Possíveis erros
- 401: Token não encontrado
- 401: Token inválido
- 400: Usuário não encontrado

---

## 4) POST /mei
### Objetivo
Cadastrar os dados de MEI do usuário autenticado.

### Headers
```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Body
```json
{
  "cnpj": "12345678000195",
  "companyName": "Empresa Exemplo LTDA",
  "ownerName": "Maria Souza",
  "cpf": "12345678901",
  "state": "SP",
  "city": "São Paulo",
  "mainActivityCNAE": "6201501",
  "activityType": "SERVICO",
  "hasAccountant": false
}
```

### Validações
- cnpj: string, mínimo 14 caracteres
- companyName: string, mínimo 3 caracteres
- ownerName: string, mínimo 3 caracteres
- cpf: string, mínimo 11 caracteres
- state: string, exatamente 2 caracteres
- city: string, mínimo 2 caracteres
- mainActivityCNAE: string, mínimo 4 caracteres
- activityType: SERVICO | COMERCIO | MISTO
- hasAccountant: boolean

### Resposta de sucesso (200)
```json
{
  "id": "uuid",
  "cnpj": "12345678000195",
  "companyName": "Empresa Exemplo LTDA",
  "ownerName": "Maria Souza",
  "cpf": "12345678901",
  "state": "SP",
  "city": "São Paulo",
  "mainActivityCNAE": "6201501",
  "activityType": "SERVICO",
  "hasAccountant": false
}
```

### Possíveis erros
- 401: token inválido ou ausente
- 400: validação do schema
- 400: usuário não encontrado
- 400: o usuário já possui informações de MEI cadastradas

---

## 5) GET /mei
### Objetivo
Buscar os dados de MEI do usuário autenticado.

### Headers
```http
Authorization: Bearer <token>
```

### Resposta de sucesso (200)
```json
{
  "id": "uuid",
  "cnpj": "12345678000195",
  "companyName": "Empresa Exemplo LTDA",
  "ownerName": "Maria Souza",
  "cpf": "12345678901",
  "state": "SP",
  "city": "São Paulo",
  "mainActivityCNAE": "6201501",
  "activityType": "SERVICO",
  "hasAccountant": false
}
```

### Possíveis erros
- 401: token inválido ou ausente
- 400: MEI não encontrado

---

## 6) POST /revenue
### Objetivo
Cadastrar uma receita vinculada ao MEI do usuário autenticado.

### Headers
```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Body
```json
{
  "amount": 150.75,
  "date": "2026-03-16",
  "type": "VENDA",
  "note": "Receita de serviço prestado"
}
```

### Validações
- amount: number, positivo
- date: string válida em formato de data
- type: VENDA | SERVICO | OUTROS
- note: string opcional

### Resposta de sucesso (201)
```json
{
  "id": "uuid",
  "amount": 150.75,
  "date": "2026-03-16T00:00:00.000Z",
  "type": "VENDA",
  "note": "Receita de serviço prestado",
  "createdAt": "2026-07-08T00:00:00.000Z"
}
```

### Possíveis erros
- 401: token inválido ou ausente
- 400: validação do schema
- 400: MEI não encontrado

---

## 7) GET /revenues
### Objetivo
Listar as receitas de um MEI.

### Headers
```http
Authorization: Bearer <token>
```

### Query params
```text
meiId=<uuid-do-mei>
```

### Exemplo
```text
GET /revenues?meiId=2f8d4c7d-6b65-4d2d-a0d5-c2b442a5f982
```

### Resposta de sucesso (200)
```json
[
  {
    "id": "uuid",
    "meiId": "uuid",
    "amount": 150.75,
    "type": "VENDA",
    "date": "2026-03-16T00:00:00.000Z",
    "note": "Receita de serviço prestado",
    "createdAt": "2026-07-08T00:00:00.000Z"
  }
]
```

### Possíveis erros
- 401: token inválido ou ausente
- 400: validação do schema
- 400: MEI não encontrado
- 400: erro interno ao buscar receitas

---

## 8) GET /revenue/:id
### Objetivo
Buscar uma receita específica, garantindo que ela pertença ao MEI do usuário autenticado.

### Headers
```http
Authorization: Bearer <token>
```

### Parâmetros de rota
```text
id: uuid-da-receita
```

### Exemplo
```text
GET /revenue/1c4a0f91-f17f-4a8a-8f43-37c8a4f0f6cf
```

### Resposta de sucesso (200)
```json
{
  "id": "1c4a0f91-f17f-4a8a-8f43-37c8a4f0f6cf",
  "meiId": "2f8d4c7d-6b65-4d2d-a0d5-c2b442a5f982",
  "amount": 150.75,
  "date": "2026-03-16T00:00:00.000Z",
  "type": "VENDA",
  "note": "Receita de serviço prestado",
  "createdAt": "2026-07-08T00:00:00.000Z"
}
```

### Possíveis erros
- 401: token inválido ou ausente
- 400: validação do schema
- 400: receita não encontrada
- 400: não autorizado

---

## Observações gerais
- O projeto usa o header Authorization com o formato Bearer <token> para todas as rotas autenticadas.
- O middleware validateSchema valida body, query e params de forma centralizada.
- O middleware isAuthenticated injeta o identificador do usuário em req.user_id para os services.
