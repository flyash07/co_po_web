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

see below

### Example Response
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsaWNlQHVuaXYuZWR1IiwiaWQiOiI2N2Y2NWIzMzlmY2EwMjkxNmIwYWY2ZDUiLCJpYXQiOjE3NDQxOTg1NTh9.nscBHcZPC4Y7ywX4rNxGD78VglrTtx3R90m5ck6AI1U",
    "output": {
        "name": "Dr. Alice",
        "designation": "Associate Professor",
        "code": "P001",
        "email": "alice@univ.edu",
        "courseNames": [
            {
                "id": "67f65b339fca02916b0af6dd",
                "name": "Operating Systems",
                "sem": "4",
                "secName": "A",
                "role": "coordinator"
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
    },
    "asswise": [
        {
            "regNo": 395820614,
            "name": "Aanya",
            "coWiseMarks": {
                "ass1": {
                    "CO1": 3.5
                },
                "ass2": {
                    "CO2": 2.5,
                    "CO3": 0.5,
                    "CO4": 0.5,
                    "CO5": 0
                }
            }
        },
    ]
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
## `/course/postPoCo` Endpoint

### Description

Send Po, PSO, CO Mapping

### HTTP Method

`post`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
{
   "inputArray":[
  [1, 2, 0, 1, 3, 0, 2, 0, 1, 0, 2, 1,  1, 0, 2, 1],
  [0, 1, 3, 2, 0, 1, 1, 0, 0, 1, 2, 0,  2, 1, 0, 0],
  [2, 0, 1, 3, 1, 2, 0, 2, 1, 0, 1, 3,  1, 1, 0, 2],
  [0, 0, 0, 1, 2, 1, 3, 0, 0, 2, 1, 1,  0, 2, 1, 0],
  [3, 1, 2, 0, 0, 1, 0, 2, 3, 0, 1, 2,  1, 0, 0, 1],
  [1, 3, 0, 0, 2, 2, 1, 0, 1, 1, 0, 3,  3, 2, 1, 0],
  [0, 0, 1, 2, 1, 0, 2, 1, 0, 3, 2, 1,  2, 1, 3, 0],
  [2, 2, 0, 1, 3, 1, 0, 0, 1, 2, 0, 1,  1, 2, 0, 2]
],
"courseId":"67f259f677f31bdad6d1dc16"
}
```
  
### Response Type

- `JSON`:Message

### Example Response
```
{
    "message": "Mappings saved successfully"
}
```

## `/course/getCoPo` Endpoint

### Description

RECV Po, PSO, CO Mapping

### HTTP Method

`GET`

### Request Body

- `header.Authorization`:JWT Token
- `params`(Sample below)
```
courseId:67f259f677f31bdad6d1dc16
```
  
### Response Type

- `JSON`:Message

### Example Response
```
[
  [1, 2, 0, 1, 3, 0, 2, 0, 1, 0, 2, 1,  1, 0, 2, 1],
  [0, 1, 3, 2, 0, 1, 1, 0, 0, 1, 2, 0,  2, 1, 0, 0],
  [2, 0, 1, 3, 1, 2, 0, 2, 1, 0, 1, 3,  1, 1, 0, 2],
  [0, 0, 0, 1, 2, 1, 3, 0, 0, 2, 1, 1,  0, 2, 1, 0],
  [3, 1, 2, 0, 0, 1, 0, 2, 3, 0, 1, 2,  1, 0, 0, 1],
  [1, 3, 0, 0, 2, 2, 1, 0, 1, 1, 0, 3,  3, 2, 1, 0],
  [0, 0, 1, 2, 1, 0, 2, 1, 0, 3, 2, 1,  2, 1, 3, 0],
  [2, 2, 0, 1, 3, 1, 0, 0, 1, 2, 0, 1,  1, 2, 0, 2]
]
```
## `/final/poAtt` Endpoint

### Description

Recv po, pso att

### HTTP Method

`GET`

### Request Body

- `header.Authorization`:JWT Token
- `params`(Sample below)
```
courseId:67f259f677f31bdad6d1dc16
```
  
### Response Type

- `JSON`:Object

### Example Response
```
{
    "directCo": [
        2.34,
        2.46,
        1.04,
        1.12,
        1.16,
        0,
        0,
        0
    ],
    "overallCo": [
        2.472,
        2.568,
        1.432,
        1.4960000000000002,
        1.528,
        0.6,
        0.6,
        0.6
    ],
    "po": [
        [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
        ],
        .. For each CO (8 co's total)
    ],
    "pso": [
        [
            1,
            1,
            1,
            1
        ],
        .. For each CO (8 co's total)
    ],
    "targetPo": [
        1,
        2,
        1,
        2,
        1,
        2,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    "targetPso": [
        0,
        0,
        0,
        0
    ],
    "directPo": [
        2.34,
        2.4,
        2.34,
        0.845,
        2.34,
        1.75,
        1.17,
        2.34,
        2.4,
        1.73,
        1.17,
        2.34
    ],
    "overallPo": [
        2.472,
        2.52,
        2.472,
        1.2759999999999998,
        2.472,
        2,
        1.536,
        2.472,
        2.52,
        1.984,
        1.536,
        2.472
    ],
    "directPso": [
        2.34,
        2.4,
        2.34,
        0.845
    ],
    "overallPso": [
        2.472,
        2.52,
        2.472,
        1.2759999999999998
    ]
}
```
## `/final/getPoPlan` Endpoint

### Description

GET PO ACTION PLAN PAGE

### HTTP Method

`GET`

### Request Body

- `header.Authorization`:JWT Token
- `params`(Sample below)
```
courseId:67f259f677f31bdad6d1dc16
```
  
### Response Type

- `JSON`:Object

### Example Response
```
[
    {
        "targetSet": 1,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 1,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 1,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 2,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 0,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 1,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 0,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 1,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 0,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 0,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 0,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 0,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 0,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 0,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 0,
        "attained": 0,
        "action": " "
    },
    {
        "targetSet": 0,
        "attained": 0,
        "action": " "
    }
]
```
## `final/postPoPlan` Endpoint

### Description

GET PO ACTION PLAN PAGE

### HTTP Method

`GET`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
{
    "updates":[
  "Improve syllabus clarity",
  "Conduct remedial classes",
  "Use case-based teaching",
  "Organize coding contests",
  "Introduce quizzes",
  "Invite guest lectures",
  "Hands-on lab sessions",
  "Weekly assignments",
  "Peer assessments",
  "Encourage research projects",
  "Soft skill workshops",
  "Extra problem-solving sessions",
  "Bridge course for weak students",
  "Industry-based projects",
  "Advanced lab training",
  "One-on-one mentoring"
],
"courseId":"67f284aefae8a333cd2bf532"
}
```
  
### Response Type

- `JSON`:Object

### Example Response
```
{
    "message": "Action plans updated successfully",
}
```
## `/index/courseDet` Endpoint

### Description

Tells if CO Targets and PoPso Targets are set

### HTTP Method

`GET`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
{
"courseId":"67f284aefae8a333cd2bf532"
}
```
  
### Response Type

- `JSON`:Object

### Example Response
```
{
    "coSet": false,
    "copoSet": false
}
```
### ADMIN APIs

## `/admin/addfaculty` Endpoint

### Description

Creating faculty profiles from Excel data

### HTTP Method

`post`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
[
  {
    "facultyID": "P014",
    "email": "dice@univ.edu",
    "name": "Dr. dice",
    "phoneNo": 1234567892,
    "dept": "CSE",
    "password": "uiop",
    "designation": "Associate Professor"
  }
]
```
  
### Response Type

- `JSON`:Message

### Example Response
```
{
    "message": "1 faculty members added successfully"
}
```

## `/admin/addsection` Endpoint

### Description

Creating sections ('dept', 'program', 'batch', 'sem')  from Excel data

### HTTP Method

`post`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
[
  {
    "name": "A",
    "dept": "CSE",
    "program": "B.Tech",
    "batch": 2026,
    "sem": 6
  }
]
```
  
### Response Type

- `JSON`:Message

### Example Response
```
{
    "message": "1 sections added successfully"
}
```

## `/admin/addcourse` Endpoint

### Description

Creating courses  from Excel data

### HTTP Method

`post`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
[
  {
    "name": "Operating Systems",
    "courseID": "CS401",
    "type": "Core",
    "program": "Btech",
    "sem": 4,
    "year": 2025,
    "oddEven": "Even",
    "dept": "CSE",
    "coStatements": "good theory-2, better lab-3"
  }
]
```
  
### Response Type

- `JSON`:Message

### Example Response
```
{
    "message": "1 courses added successfully"
}
```

## `/admin/addstudents` Endpoint

### Description

Creating students from Excel data

### HTTP Method

`post`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
[
  {
    "name": "Aanya",
    "regNo": 395820614,
    "dept ": "CSE",
    "program": "Btech",
    "batch": 2026,
    "sem": 4,
    "section": "A",
    "courses": "CSE301"
  }
]
```
  
### Response Type

- `JSON`:Message

### Example Response
```
{
    "message": "1 students added successfully"
}
```

## `/admin/course-allocation` Endpoint

### Description

Creating courseSections and assigning sections to professors from Excel data. Assigning role of Course Coordinator if role is "coordinator".

### HTTP Method

`post`

### Request Body

- `header.Authorization`:JWT Token
- `body`(Sample below)
```
[
  {
    "facultyID": "P001",
    "name": "Dr. Alice",
    "courseID": "CS301",
    "section": "A",
    "dept": "CSE",
    "program": "B.Tech",
    "batch": 2026,
    "sem": 6,
    "role": "professor"
  }
]
```
  
### Response Type

- `JSON`:Message

### Example Response
```
{
    "message": "1 courseSections added successfully"
}
```