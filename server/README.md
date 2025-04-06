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

## `/course/postTargets` Endpoint

### Description

Updates CO,PO,PSO targets

### HTTP Method

`POST`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
{
    "courseId":"67efe64daf900bdf3332df7a",
    "coTargets": [1, 2, 3, 4, 5, 6, 7, 8],
    "poTargets": [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "psoTargets": [2, 1, 0, 0]
}
```
  
### Response Type

- `Success Msg and status update`

### Example Response
```
{
    "message": "Target Updated"
}
```

## `/cie/getCie` Endpoint

### Description

Gives u entire data for the cie page

### HTTP Method

`GET`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
{
    "courseId":"67efe64daf900bdf3332df7a",
}
```
  
### Response Type

- `JSON`:Object has 2 attributes, students and summary

### Example Response
```
{
    "students": [
        {
            "name": "Student 2",
            "regNo": 2300001,
            "cie": {
                "1": {
                    "obtained": 10,
                    "total": 20,
                    "percentage": "50.00",
                    "ala": 2
                },
                "2": {
                    "obtained": 10,
                    "total": 20,
                    "percentage": "50.00",
                    "ala": 2
                },
                "3": {
                    "obtained": 0,
                    "total": 40,
                    "percentage": "0.00",
                    "ala": 1
                },
                "4": {
                    "obtained": 0,
                    "total": 10,
                    "percentage": "0.00",
                    "ala": 1
                },
                "5": {
                    "obtained": 0,
                    "total": 10,
                    "percentage": "0.00",
                    "ala": 1
                }
            }
        },
        ...Multiple Students
    ],
    "summary": {
        "1": {
            "avgAla": "2.00",
            "level1": 0,
            "level2": 10,
            "level3": 0,
            "count": 10
        },
        "2": {
            "avgAla": "2.00",
            "level1": 0,
            "level2": 10,
            "level3": 0,
            "count": 10
        },
        "3": {
            "avgAla": "1.00",
            "level1": 10,
            "level2": 0,
            "level3": 0,
            "count": 10
        },
        "4": {
            "avgAla": "1.00",
            "level1": 10,
            "level2": 0,
            "level3": 0,
            "count": 10
        },
        "5": {
            "avgAla": "1.00",
            "level1": 10,
            "level2": 0,
            "level3": 0,
            "count": 10
        }
    }
}
```

## `/cie/postCie` Endpoint

### Description

Excel data to populate the db

### HTTP Method

`POST`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
{
"data":[
  {
    "co2": 0.5,
    "co2_1": 0.5,
    "co2_2": 0.5,
    "co2_3": 0.5,
    "co2_4": 0.5,
    "co2_5": 0.5,
    "co2_6": 0.5,
    "co2_7": 0.5,
    "co2_8": 0.5,
    "co2_9": 0.5
  },
  {
    "co2": 1,
    "co2_1": 2,
    "co2_2": 3,
    "co2_3": 4,
    "co2_4": 5,
    "co2_5": 6,
    "co2_6": 7,
    "co2_7": 8,
    "co2_8": 9,
    "co2_9": 10
  },
  {
    "name": "Aanya",
    "regno": 395820614,
    "co2": 0.5,
    "co2_1": 0.5,
    "co2_2": 0,
    "co2_3": 0,
    "co2_4": 0.5,
    "co2_5": 0.5,
    "co2_6": 0.5,
    "co2_7": 0,
    "co2_8": 0.5,
    "co2_9": 0.5
  },
  ..Multiple Students
],
"courseId":"67f169134671cad48f7ba7e5",
"assignmentType":"ass2"
}
```
  
### Response Type

- `JSON`:Message

### Example Response
```
{
    "message": "Updated DB"
}
```

## `/cie/getSee` Endpoint

### Description

Show see

### HTTP Method

`Get`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
{
    courseId:String
}
```
  
### Response Type

- `JSON`:Message

### Example Response
```
{
    "students": [
        {
            "name": "Aanya",
            "regNo": 395820614,
            "cie": {
                "1": {
                    "obtained": 7.5,
                    "total": 11,
                    "percentage": "68.18",
                    "ala": 2
                },
                "2": {
                    "obtained": 8.5,
                    "total": 11,
                    "percentage": "77.27",
                    "ala": 3
                },
                "3": {
                    "obtained": 9,
                    "total": 11,
                    "percentage": "81.82",
                    "ala": 3
                },
                "4": {
                    "obtained": 9,
                    "total": 11,
                    "percentage": "81.82",
                    "ala": 3
                },
                "5": {
                    "obtained": 7,
                    "total": 11,
                    "percentage": "63.64",
                    "ala": 2
                }
            }
        },
        ..Multiple students
    ],
    "summary": {
        "1": {
            "avgAla": "2.70",
            "level1": 0,
            "level2": 3,
            "level3": 7,
            "count": 10
        },
        ..Co levels
    }
}
```
## `/feedback/getFeedback` Endpoint

### Description

show feedback

### HTTP Method

`Get`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
{
    courseId:String
}
```
  
### Response Type

- `JSON`:Message

### Example Response
```
{
    "coSummary": [
        {
            "coNum": 1,
            "counts": {
                "1": 0,
                "2": 0,
                "3": 2,
                "4": 5,
                "5": 3
            },
            "totalStudents": 10,
            "weightedScore": "4.10",
            "attainmentLevel": 3
        },
        ..Other COs
    ],
    "courseCF": "4.01",
    "courseAttainment": 3,
    "studentFeedbackData": [
        {
            "name": "Aanya",
            "regNo": 395820614,
            "coValues": {
                "1": 4,
                "2": 5,
                "3": 3,
                "4": 4,
                "5": 4,
                "6": 3,
                "7": 4
            }
        },
        ..Other students
    ]
}
```
## `/feedback/postFeedback` Endpoint

### Description

send feedback

### HTTP Method

`post`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
{
"data":[
  {
    "co1": 5,
    "co2": 5,
    "co3": 5,
    "co4": 5,
    "co5": 5,
    "co6": 5,
    "co7": 5
  },
  {
    "name": "Aanya",
    "regno": 395820614,
    "co1": 4,
    "co2": 5,
    "co3": 3,
    "co4": 4,
    "co5": 4,
    "co6": 3,
    "co7": 4
  },
  ..Other students
],
"courseId":"67f169134671cad48f7ba7e5"
}
```
  
### Response Type

- `JSON`:Message

### Example Response
```
{
    "message": "Feedback submitted successfully."
}
```