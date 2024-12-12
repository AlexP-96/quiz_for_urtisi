# API для работы с сервером

### <u>Регистрация пользователя:</u>

**request** http://localhost /register - **POST**

```javascript
{
    "email": "email@email.ru", 
    "password": "password" 
}
```

**response**<br>

```javascript
{
    "data": "Пользователь зарегестрирован",
    "error": null
}
```

### <u>Авторизация пользователя</u>

**request** http://localhost /login - method **POST**

```javascript
{
    "email": "email@email.ru", 
    "password": "password"
}
```

**response**<br>
```javascript
{
    "data": {
        "user_id": 2,
        "email": "lubu221996@gmail.com"
    },
    "error": null
}
```

### Получение одного квиза

**request** http://localhost user/quiz/ <u>**:id**</u> - method **GET**

**:id** - передаем id квиза

**response**
```javascript
    {
    "data": {
        "quiz_id": 2,
            "quiz_name": "first quiz2",
            "user_id": 1,
            "createdAt": "2024-12-12T06:24:46.000Z",
            "updatedAt": "2024-12-12T06:24:46.000Z"
    },
    "error": null
}
```

### Создание квиза

**request** http://localhost /create_quiz - method **POST**

payload
```javascript
{
    "user_id": "1",
    "quiz_name": "quiz 3"
}
```

**response**
```javascript
{
    "data": {
        "title": {
            "quiz_id": 3,
            "user_id": "1",
            "quiz_name": "quiz 3",
            "updatedAt": "2024-12-12T10:39:46.100Z",
            "createdAt": "2024-12-12T10:39:46.100Z"
            },
    "name": "quiz 3"
    },
    "error": null
}
```
### Получение всех квизов

**request** http://localhost /user/<u>**:id**</u>/quiz_all - method **GET**

**:id** - передаем **user_id**

**response**

```javascript
{
    "data":[{
            "quiz_id": 2,
            "quiz_name": "first quiz2",
            "user_id": 1,
            "createdAt": "2024-12-12T06:24:46.000Z",
            "updatedAt": "2024-12-12T06:24:46.000Z"
        },
        {
            "quiz_id": 3,
            "quiz_name": "quiz 3",
            "user_id": 1,
            "createdAt": "2024-12-12T10:39:46.000Z",
            "updatedAt": "2024-12-12T10:39:46.000Z"
        }],
    "error": null
}
```
### Удаление квиза

**request** http://localhost /delete_quiz

payload

```javascript
{
    "quiz_id": "1",
}
```

**response**

```javascript

```
### Обновление квиза

**request** 

payload

```javascript
{
    "user_id": "1";
    "quiz_id": "1";
}
```
**response**
```javascript

```
