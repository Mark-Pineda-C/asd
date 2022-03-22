Tabla de contenidos
- [Informacion del proyecto](#informacion-del-proyecto)
- [instrucciones de instalacion](#instrucciones-de-instalacion)
- [Dependencias](#dependencias)
- [Api](#api)
  - [Usuarios](#usuarios)
    - [validate](#validate)
    - [validate-admin](#validate-admin)
    - [get-users](#get-users)
    - [get-credentials](#get-credentials)
    - [insert-many](#insert-many)
    - [update-vote](#update-vote)
    - [logout](#logout)
  - [Procesos](#procesos)
    - [get-process-list](#get-process-list)
    - [create-process](#create-process)
    - [get-process-positions](#get-process-positions)
  - [Votos](#votos)
    - [create-vote](#create-vote)
    - [vote-count](#vote-count)

# Informacion del proyecto

Este es el backend del proyecto instavote, cronstruido en `Node.js`

# instrucciones de instalacion

instalar dependencias
```bash
npm install
```

correr servidor
```bash
npm run start
```

# Dependencias

Las dependencias utilizadas en esta aplicacion son:

- [Bree.js](https://github.com/breejs/bree)
- [Express.js](https://expressjs.com/es/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [luxon](https://moment.github.io/luxon/#/)
- [mongoose](https://mongoosejs.com/docs/guide.html)
- [nodemailer](https://nodemailer.com/about/)

# Api

Endpoints del backend de InstaVote:

## Usuarios

### validate

Endpoint que se utiliza para acceder al sistema como usuario
```
http//localhost:3900/api/users/validate

request:                            
{                                   
    id: "user",                        
    pin: "userpswd",
    institute; "test"
}                                   
```

### validate-admin

Endpoint que se utiliza para acceder al sistema como administrador
```
http//localhost:3900/api/users/validate-admin

request:
{
    id: "admin",
    pin: "adminpswd"
}
```

### get-users

Endpoint que se utiliza par obtener el total de usuarios
```
http//localhost:3900/api/users/get-users/:institute

response: 
{
    status: 'success',
    totalUsers: 352
}
```

### get-credentials

Endpoint que se utiliza para obtener el pin y el id de acceso a traves de correo
```
http//localhost:3900/api/users/get-credential

request:
{
    code: "DH232212",
    institute: "instituto-de-prueba",
    mail: "micorreode@ejemplo.com"
}
```

### insert-many

Endpoint utilizado para insertar usuarios de manera masiva.
Requiere autorizacion por jwt
```
http//localhost:3900/api/users/insert-many

request
[
    {
        id: "JJ232210",
        name: "carlos"
    },
    {
        id: "KC249733",
        name: "Juan"
    },
    .
    .
    .
]
```

### update-vote

Endpoint utilizado para actualizar al usuario, indicando que este ya ha votado.
Requiere autorizacion por jwt
```
http//localhost:3900/api/users/update-vote

request:
{
    id:"KU232110"
}
```

### logout

Endpoint que se usa para cerrar la sesion de un usario.
Requiere autorizacion por jwt
```
http//localhost:3900/api/users/logout

request:
{
    id:"KU232110"
}
```

## Procesos

### get-process-list

Endpoint por el cual podemos obtener todos los datos de los procesos existentes
```
http//localhost:3900/api/process/get-process-list

response:
{
    status: 'success',
    processData: [
        {
            ProcessName: "..."
            ProcessDateStart: "..."
            ...
        },
        {...},
        {...},
        .
        .
        .
    ]
}
```

### create-process

Endpoint para crear un nuevo proceso de votacion en el sistema.
Requiere autorizacion por jwt
```
http//localhost:3900/api/process/create-process

request:
{
    ProcessName: "...",
    ProcessDateStart: "...",
    ProcessDateEnd: "...".
    ProcessInstitute: "...",
    Positions: [
        {...},
        {...},
        .
        .
        .
    ]
}
```

### get-process-positions

EndPoint para obtener los datos de un proceso en especifico.
Requiere autorizacion por jwt
```
http//localhost:3900/api/process/get-process-positions

response:
{
    status: 'success',
    Data: [
        {
            position: "posicion 1",
            candidates: [
                {
                    name: "...",
                    image: "...",
                    group: "..."
                },
                {...},
                {...},
                .
                .
                .
            ]
        },
        {...},
        {...},
        .
        .
        .
    ]
}
```

## Votos

### create-vote

Endpoint para insertar un nuevo voto a la base de datos.
Requiere autorizacion por jwt
```
http//localhost:3900/api/votes/create-vote

request:
{
    institute: "test",
    votes: [
        {
            forPosition: 0,
            candidate: "a48328478asd92378j9)
        },
        {
            forPosition: 1,
            candidate: "mjjdkoi34u8487asnas)
        },
        {...},
        {...},
        .
        .
        .
    ]
}
```

### vote-count

Endpoint que cuenta el numero de votos a traves de la id del proceso
```
http//localhost:3900/api/votes/vote-count/:id

response:
{
    status: 'success',
    voteCount: 312
}
```