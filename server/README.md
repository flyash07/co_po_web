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
          - `courseName` (List of Strings)

### Example Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhamVzaC5rdW1hckB1bml2ZXJzaXR5LmVkdSIsImlkIjoiNjdlY2MyMmRmZjljZjdhNmYzZjQyYWU2IiwiaWF0IjoxNzQzNjYxMzI5fQ.I-jEBgUrpXk9GYr1c1ntgKPMZfqo7JfjIQXD_jnyPvE",
    "output": {
        "name": "Dr. Rajesh Kumar",
        "email": "rajesh.kumar@university.edu",
        "courseNames": [
            "Data Structures and Algorithms"
        ]
    }
}
```
