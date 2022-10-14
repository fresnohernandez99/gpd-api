# GPD

This is the main documentation to deploy GPD project to dev or production enviroment. It contains others useful infos.

## How to install GPD on DEV enviroment

**You have to be familiariced with NodeJS projects.**

### Requirements:
- 1 - NodeJS version 1.14 or high.
- 2 - PostgresSQL and pgAdmin.
- 3 - Postman.

### Steps:
- 1 - Open a system console on the project root.
- 2 - Run command ```npm i``` just the first time
- 3 - Run command ```npm start```
- 4 - Run [SQL](./src/database/_initi.sql) file on query tool of pgAdmin.
- 5 To test the api endpoints import the Postman [enviroment](./docs/gdp_env.postman_environment.json) and [collection](./docs/GPD.postman_collection.json).

### Admin Credentials
```
phone: 00000000
password: admin
```

## Server responses
### Structure
```
{
    "statusCode": 1,
    "message": "Example message",
    "data": {
        "abyObject": {}
    }
}
```
### Response code
- 1 Correct
- 2 Error
- 3 Bad request
- 4 Missing data
- Includes all the other http codes like 2xx and 4xx
- #### Specials
    - 21 Already registered
    - 22 Waiting to be activated

## License
Jetpack is licensed under [GNU General Public License v2 (or later)](./LICENSE.txt).

## Team
[@fresnohernandez99](https://www.twitter.com/GOku99PRO)

Interested in working on awesome open-source code all day? [write me](fresnohernandez99@gmail.com).