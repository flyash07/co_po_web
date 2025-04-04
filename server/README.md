# Backend API Documentation
# create a .env file inside server folder
add the following
```
MONGODB_URL="mongodb://localhost:27017"
JWT_KEY="abcd"
```
## `/index/login` Endpoint

### Description

Login into with email, password

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required)
- `password` (string, required)
  
### Response Type

- `token` (string, JWT token)
- `output`
  - `name` (String)
  - `email` (String)
  - `courseName` (List of Objects with course name and id)

### Example Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhamVzaC5rdW1hckB1bml2ZXJzaXR5LmVkdSIsImlkIjoiNjdlY2MyMmRmZjljZjdhNmYzZjQyYWU2IiwiaWF0IjoxNzQzNjY1MTY4fQ.aS4sQl2BWPKKg3JUVbsnfy_90rEqUjU5vKT57Z1wEQg",
    "output": {
"name": "Dr. Rajesh Kumar",
"email": "rajesh.kumar@university.edu",
"courseNames": [
    {
"id": "67ecc22dff9cf7a6f3f42af0",
"name": "Data Structures and Algorithms"
    }
]
    }
}
```

## `/index/logout` Endpoint

### Description

Logouts

### HTTP Method

`POST`

### Request Body

Nothing req
  
### Response Type

- `message`(String)

### Example Response
```
{
    "message": "Logged out successfully"
}
```

## `/course/getTargets` Endpoint

### Description

Outputs CO,PO,PSO targets

### HTTP Method

`GET`

### Request Body

- `header.Authorization`:JWT Token
- `body`
    - `courseId`:String
  
### Response Type

- `JSON Data`

### Example Response
```
{
    "coTargets": [0,0,0,0,0,0,0,0],
    "coPrevTargets": [0,0,0,0,0,0,0,0],
    "coPrevAttained": [0,0,0,0,0,0,0,0],
    "poTargets": [0,0,0,0,0,0,0,0,0,0,0,0],
    "psoTargets": [0,0,0,0]
}
```


