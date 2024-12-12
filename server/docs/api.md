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

**request** http://localhost user/**:user_id**/quiz/**:quiz_id** - method **GET**

**:user_id** - передаем id пользователя<br>
**:quiz_id** - передаем id квиза

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

**request** http://localhost /user/**:user_id**/create_quiz - method **POST**

**:user_id** - id пользователя

payload
```javascript
{
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

**request** http://localhost /user/<u>**:user_id**</u>/quiz_all - method **GET**

**:user_id** - передаем id пользователя

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

**request** http://localhost /user/**:user_id**/delete_quiz/**:quiz_id** - method **DELETE**

**:user_id** - передаем id пользователя<br>
**:quiz_id** - пердаем id квиза

**response**

```javascript
    TODO
```
### Обновление квиза 

**request** http://localhost /user/**:user_id**/update_quiz/**:quiz_id** - method **POST**

**:user_id** - передаем id пользователя<br>
**:quiz_id** - передаем id квиза

payload

```javascript
{
    "quiz_name": "new name";
}
```
**response**
```javascript
    TODO
```
