# Wassup! - Back End

### Select a language: <a href="./README_pt-br.md">Brazilian Portuguese<a/>, English.

## Author

| [<img src="https://avatars.githubusercontent.com/u/94022088?s=400&u=829c8531a69be7d30b1096c762a5ff4f9a7172fe&v=4" width=115><br><sub>Victor Vinícius da Silva Galvão</sub>](https://github.com/victorvinicius33)
| :---: |

[![Linkedin Badge](https://img.shields.io/badge/-Victor-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/victor-v-s-galvao/)](https://www.linkedin.com/in/victor-v-s-galvao/)
[![Gmail Badge](https://img.shields.io/badge/-victorvinicius33.vv@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:victorvinicius33.vv@gmail.com)](mailto:victorvinicius33.vv@gmail.com)

## **About the project**

This project is an RESTful API, made with <i>Node.js</i>, <i>PostgreSQL</i> and <i>Socket.IO</i>, and it's the backend for a website called "Wassup!". The API was made to create users, add contacts and send messages to another user, or talk with the bot.

## **Database**

The schema in the SQL database, can be found inside the `src` folder, named as "dump.sql". URL of dump.sql: `./src/dump.sql`.

## **Endpoints**

### **Sign up**

#### `POST` `/user`

- **Request**

  No route parameters or query.  
  The body must have an object with the following properties:

  - name
  - email
  - password
  - repeatPassword

#### **Request example**

```javascript
// POST /user
{
    "name": "Victor",
    "email": "victor@email.com",
    "password": "123456",
    "repeatPassword": "123456"
}
```

#### **Response examples**

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

## **ATENTION**: Create the first user with the email <i>"bot@gmail.com"</i>, and a name and password of your choice. This user will serve for messages to the bot, and all users will have a contact and a conversation room with this bot email, at the time of account creation.

### **Login user**

#### `POST` `/login`

- **Request**  
  No route parameters or query.  
  The body must have an object with the following properties:

  - email
  - password

#### **Request example**

```javascript
// POST /user
{
    "email": "victor@email.com",
    "password": "123456"
}
```

#### **Response examples**

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

## **ATENTION**: All the following endpoints, from now on, require the authentication token of the logged in user, receiving a header with the Bearer Token format.

- **Header example**

```javascript
{
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

---

### **Detail user**

#### `GET` `/user`

- **Request**  
  No route parameters or query.  
  No content in the body request.

#### **Request example**

```javascript
// GET /user
// No content in the body request.
```

#### **Response examples**

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

### **Get all contacts**

#### `GET` `/contact`

- **Request**  
  No route parameters or query.  
  No content in the body request.

#### **Request example**

```javascript
// GET /contact
// No content in the body request.
```

#### **Response examples**

```javascript
// HTTP Status 200
[
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
```

### **Add contact**

#### `POST` `/contact`

- **Request**  
  No route parameters or query.  
  The body must have an object with the following properties:

  - email

#### **Request example**

```javascript
// POST /contact
{
	"email": "victor@gmail.com"
}
```

#### **Response examples**

```javascript
// HTTP Status 201
[
	{
		"id": 3,
		"name": "Victor",
		"email": "victor@email.com",
		"user_id": 2
	}
]
```

### **Send Message**

#### `POST` `/chat`

- **Request**  
  No route parameters or query.  
  The body must have an object with the following properties:

  - sent_by
  - received_by
  - message_data
  - time_sent
  - room

#### **Request example**

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

#### **Response examples**

```javascript
// HTTP Status 201
[
	{
		"id": 392,
		"sent_by": "victor@email.com",
		"received_by": "lemmy@gmail.com",
		"message_data": "Olá, gostaria de entrar em contato com você",
		"time_sent": "2020-06-03T13:55:17.000Z",
		"room_id": 2
	}
]
```

### **Get all conversation data**

#### `GET` `/chat`

- **Request**  
  No route parameters or query.  
  No content in the body request.

#### **Request example**

```javascript
// GET /chat
// No content in the body request.
```

#### **Response examples**

```javascript
// HTTP Status 200
[
	{
		"id": 1,
		"sent_by": "victor@email.com",
		"received_by": "lemmy@gmail.com",
		"message_data": "Olá",
		"time_sent": "2022-12-14T10:33:55.399Z",
		"room_id": 2
	},
	{
		"id": 2,
		"sent_by": "lemmy@email.com",
		"received_by": "victor@gmail.com",
		"message_data": "Olá",
		"time_sent": "2022-12-14T10:34:50.318Z",
		"room_id": 2
	},
	{
		"id": 3,
		"sent_by": "lemmy@gmail.com",
		"received_by": "victor@email.com",
		"message_data": "olá",
		"time_sent": "2022-12-14T10:35:32.210Z",
		"room_id": 2
	},
	{
		"id": 4,
		"sent_by": "victor@email.com",
		"received_by": "bot@gmail.com",
		"message_data": "qual o seu nome?",
		"time_sent": "2022-12-14T10:35:47.402Z",
		"room_id": 1
	},
]
```

### **Get all conversation rooms of logged user**

#### `GET` `/room`

- **Request**  
  No route parameters or query.  
  No content in the body request.

#### **Request example**

```javascript
// GET /room
// No content in the body request.
```

#### **Response example**

```javascript
// HTTP Status 200
[
	{
		"id": 1,
		"first_user_email": "victor@gmail.com",
		"second_user_email": "bot@gmail.com"
	},
	{
		"id": 3,
		"first_user_email": "lemmy@gmail.com",
		"second_user_email": "victor@gmail.com"
	}
]
```
