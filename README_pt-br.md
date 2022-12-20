# Wassup! - Back End

### Selecione um idioma: Português (Brasil), <a href="./README.md">Inglês<a/>.

## Autor

| [<img src="https://avatars.githubusercontent.com/u/94022088?s=400&u=829c8531a69be7d30b1096c762a5ff4f9a7172fe&v=4" width=115><br><sub>Victor Vinícius da Silva Galvão</sub>](https://github.com/victorvinicius33)
| :---: |

[![Linkedin Badge](https://img.shields.io/badge/-Victor-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/victor-v-s-galvao/)](https://www.linkedin.com/in/victor-v-s-galvao/)
[![Gmail Badge](https://img.shields.io/badge/-victorvinicius33.vv@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:victorvinicius33.vv@gmail.com)](mailto:victorvinicius33.vv@gmail.com)

## **Sobre o projeto**

Esse projeto é uma API RESTful, feito com <i>Node.js</i>, <i>PostgreSQL</i> e <i>Socket.IO</i>, e é o backend de um website chamado "Wassup!". a API foi feita para criar usuários, adicionar contatos, e mandar mensagem para outro usuário ou para o bot.

## **Database**

O schema do database SQL, pode ser encontrado dentro da pasta `src`, com o nome de "dump.sql". URL do dump.sql: `./src/dump.sql`.

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/user`

- **Requisição**

  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades:

  - name
  - email
  - password
  - repeatPassword

#### **Exemplo de requisição**

```javascript
// POST /user
{
    "name": "Victor",
    "email": "victor@email.com",
    "password": "123456",
    "repeatPassword": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201
{
    "id": 2,
    "name": "Victor",
    "email": "victor@email.com"
}
```

```javascript
// HTTP Status 400
{
    "message": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

## **Atenção**: Crie o primeiro usuário com o email <i>"bot@gmail.com"</i>, e um nome e senha de sua escolha. Esse usuário irá servir para mandar mensagens para o bot, e todos os usuários irão ter um contato e uma sala de conversa com o email desse bot, no momento da criação de conta.

### **Login do usuário**

#### `POST` `/login`

- **Requisição**  
  Sem parâmetros de rota ou de query.
  O corpo (body) deverá possuir um objeto com as seguintes propriedades:

  - email
  - password

#### **Exemplo de requisição**

```javascript
// POST /user
{
    "email": "victor@email.com",
    "password": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "user": {
        "id": 2,
        "name": "Victor",
        "email": "victor@email.com"
    },
    "contacts": [
		{
			"id": 1,
			"name": "bot",
			"email": "bot@gmail.com",
			"user_id": 2
		},
		{
			"id": 3,
			"name": "Lemmy Kilmister",
			"email": "lemmy@gmail.com",
			"user_id": 2
		}
	],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400
{
    "message": "O e-mail ou senha estão incorretos."
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

- **Header example**

```javascript
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

---

### **Detalhar usuário**

#### `GET` `/user`

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo da requisição.

#### **Exemplo de requisição**

```javascript
// GET /user
// Sem conteúdo no corpo (body) da requisição.
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
	"id": 2,
	"name": "victor",
	"email": "victor@email.com",
	"contacts": [
		{
			"id": 1,
			"name": "bot",
			"email": "bot@gmail.com",
			"user_id": 2
		},
		{
			"id": 3,
			"name": "Lemmy Kilmister",
			"email": "lemmy@gmail.com",
			"user_id": 2
		}
	]
}
```

```javascript
// HTTP Status 401
{
    "message": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

### **Obter todos os contatos**

#### `GET` `/contact`

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo da requisição.

#### **Exemplo de requisição**

```javascript
// GET /contact
// Sem conteúdo no corpo (body) da requisição.
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
[
  {
    id: 1,
    name: 'bot',
    email: 'bot@gmail.com',
    user_id: 2,
  },
  {
    id: 3,
    name: 'Lemmy Kilmister',
    email: 'lemmy@gmail.com',
    user_id: 2,
  },
];
```

### **Adicionar contato**

#### `POST` `/contact`

- **Requisição**  
  Sem parâmetros de rota ou de query.   
  O corpo (body) deverá possuir um objeto com as seguintes propriedades:

  - email

#### **Exemplo de requisição**

```javascript
// POST /contact
{
	"email": "victor@gmail.com"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201
[
  {
    id: 3,
    name: 'Victor',
    email: 'victor@email.com',
    user_id: 2,
  },
];
```

### **Enviar mensagem**

#### `POST` `/chat`

- **Requisição**  
  Sem parâmetros de rota ou de query.  
  O corpo (body) deverá possuir um objeto com as seguintes propriedades:

  - sent_by
  - received_by
  - message_data
  - time_sent
  - room

#### **Exemplo de requisição**

```javascript
// POST /chat
{
	"sent_by": "victor@email.com",
	"received_by": "lemmy@gmail.com",
	"message_data": "Olá, gostaria de entrar em contato com você",
	"time_sent": "2022-06-03T10:55:17Z",
	"room": 2
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201
[
  {
    id: 392,
    sent_by: 'victor@email.com',
    received_by: 'lemmy@gmail.com',
    message_data: 'Olá, gostaria de entrar em contato com você',
    time_sent: '2020-06-03T13:55:17.000Z',
    room_id: 2,
  },
];
```

### **Obter todo o histórico de conversas**

#### `GET` `/chat`

- **Request**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo (body) da requisição.

#### **Exemplo de requisição**

```javascript
// GET /chat
// Sem conteúdo no corpo (body) da requisição.
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
[
  {
    id: 1,
    sent_by: 'victor@email.com',
    received_by: 'lemmy@gmail.com',
    message_data: 'Olá',
    time_sent: '2022-12-14T10:33:55.399Z',
    room_id: 2,
  },
  {
    id: 2,
    sent_by: 'lemmy@email.com',
    received_by: 'victor@gmail.com',
    message_data: 'Olá',
    time_sent: '2022-12-14T10:34:50.318Z',
    room_id: 2,
  },
  {
    id: 3,
    sent_by: 'lemmy@gmail.com',
    received_by: 'victor@email.com',
    message_data: 'olá',
    time_sent: '2022-12-14T10:35:32.210Z',
    room_id: 2,
  },
  {
    id: 4,
    sent_by: 'victor@email.com',
    received_by: 'bot@gmail.com',
    message_data: 'qual o seu nome?',
    time_sent: '2022-12-14T10:35:47.402Z',
    room_id: 1,
  },
];
```

### **Obter todas as salas de conversa do usuário logado**

#### `GET` `/room`

-  **Requisição**  
  Sem parâmetros de rota ou de query.  
  Não deverá possuir conteúdo no corpo (body) da requisição.

#### **Exemplo de requisição**

```javascript
// GET /room
// Sem conteúdo no corpo (body) da requisição.
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
[
  {
    id: 1,
    first_user_email: 'victor@gmail.com',
    second_user_email: 'bot@gmail.com',
  },
  {
    id: 3,
    first_user_email: 'lemmy@gmail.com',
    second_user_email: 'victor@gmail.com',
  },
];
```
