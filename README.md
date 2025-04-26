# 📘 API - Gerenciamento de Usuários

Esta API permite o gerenciamento de usuários com operações de CRUD e ativação/desativação, utilizando dados mockados em memória.

---
## Instalação

```bash
$ npm install
```

## Compilar e rodar
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```


##  Endpoints

### 🔹 `GET /users/getAll`
Retorna todos os usuários cadastrados, sem filtros.

**Resposta:**
```json
[
  {
    "id": "123",
    "firstName": "Ana",
    "lastName": "Silva",
    "email": "ana@example.com",
    "isActive": true,
    "profileId": "01"
  }
]
```

---

### 🔹 `GET /users/getUsers`
Filtra usuários por `profileId` e/ou `userId`. Caso não sejam enviados filtros o retorno é a lista completa de dados.

**Query Params:**
- `profileId` (opcional): filtra usuários por perfil.
- `userId` (opcional): busca usuário específico.

**Exemplos:**
```
/users/getUsers?profileId=01
/users/getUsers?userId=abc123
/users/getUsers?userId=abc123&profileId=01
```

**Resposta:**
```json
[
  {
    "id": "abc123",
    "firstName": "João",
    "lastName": "Souza",
    "email": "joao@example.com",
    "isActive": true,
    "profileId": "01"
  }
]
```

---

### 🔹 `POST /users/create`
Cria um novo usuário.

**Request Body:**
```json
{
  "firstName": "João",
  "lastName": "Souza",
  "email": "joao@example.com",
  "isActive": true,
  "profileId": "02"
}
```

**Resposta:**
```json
{
  "id": "generated-id",
  "firstName": "João",
  "lastName": "Souza",
  "email": "joao@example.com",
  "isActive": true,
  "profileId": "02"
}
```

---

### 🔹 `PUT /users/update/:id`
Atualiza os dados de um usuário existente.

**URL Param:**
- `id`: ID do usuário a ser atualizado.

**Request Body:**
```json
{
  "firstName": "João",
  "lastName": "Atualizado",
  "email": "joao.atualizado@example.com",
  "isActive": false,
  "profileId": "03"
}
```

**Resposta:**
```json
{
  "id": "abc123",
  "firstName": "João",
  "lastName": "Atualizado",
  "email": "joao.atualizado@example.com",
  "isActive": false,
  "profileId": "03"
}
```

---

### 🔹 `PATCH /users/active/:id`
Alterna o status de ativação (`isActive`) de um usuário.

**URL Param:**
- `id`: ID do usuário.

**Resposta:**
```json
{
  "id": "abc123",
  "isActive": false
}
```

---

### 🔹 `DELETE /users/delete/:id`
Remove um usuário do sistema.

**URL Param:**
- `id`: ID do usuário a ser removido.

**Resposta:**
```
200 OK
Usuário deletado com sucesso.
```

---

## Observações

- Todos os dados são mantidos apenas em memória (não persistem ao reiniciar).
- O campo `profileId` deve conter um ID válido já cadastrado (ex: "01", "02", "03").
- A API retorna status HTTP apropriados para erros, como:
    - `400 Bad Request`: campos obrigatórios inválidos
    - `404 Not Found`: usuário não encontrado
---

##  Possíveis Erros (Exceptions)

A API trata diversos cenários de erro com status HTTP apropriados e mensagens claras.

###  400 - Bad Request

- **Campo `id` vazio:**
    - Ocorre ao tentar acessar, atualizar, ativar ou deletar um usuário com `id` em branco.
  ```json
  {
    "statusCode": 400,
    "message": "Id field cannot be empty.",
    "error": "Bad Request"
  }
  ```

- **Campo `profileId` vazio:**
    - Ao criar ou atualizar um usuário com `profileId` em branco.
  ```json
  {
    "statusCode": 400,
    "message": "ProfileId field cannot be empty.",
    "error": "Bad Request"
  }
  ```

---

###  404 - Not Found

- **Usuário não encontrado:**
    - Ao tentar acessar, atualizar, ativar ou deletar um usuário inexistente.
  ```json
  {
    "statusCode": 404,
    "message": "User with id: abc123 not found",
    "error": "Not Found"
  }
  ```

- **Perfil inexistente:**
    - Ao criar ou atualizar um usuário com `profileId` que não está cadastrado.
  ```json
  {
    "statusCode": 404,
    "message": "ProfileId: 99 Not Found",
    "error": "Not Found"
  }
  ```

---
