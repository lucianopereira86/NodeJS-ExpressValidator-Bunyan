![titulo](/docs/titulo.JPG)

# NodeJS-ExpressValidator-Bunyan

Validating and logging a NodeJS web API with Express-Validator and Bunyan.

## Technologies:

- [NodeJS Express](https://expressjs.com/pt-br/)
- [Express-Validator](https://express-validator.github.io/docs/)
- [Bunyan](https://github.com/trentm/node-bunyan)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [MongoDB](https://www.mongodb.com/)

## Objectives

This project was created to demonstrate two important processes in a NodeJS web API: validating parameters and logging.
This [CRUD example](https://github.com/lucianopereira86/CRUD-NodeJS-Swagger-MongoDB) was used because it contains Swagger UI and MongoDB connection.

## Express-Validator

For .Net developers, this tool will seem very similar to [FluentValidation](https://fluentvalidation.net/).
Inside the '/validators' folder, the "UserValidator.js" file is responsible for validating the user's methods like POST and PUT.

![code01](/docs/code01.JPG)

The "/controllers/user.js" file's methods contains their respective validation array as the second parameter.

![code02](/docs/code02.JPG)

The "/validators/BaseValidator.js" file contains the "validate" function responsible for validating the parameters and returning an array of errors.

![code03](/docs/code03.JPG)

## Bunyan

Inside the "server.js" file, Bunyan works as a middleware by intercepting requests and responses.

![code04](/docs/code04.JPG)

The "logger.js" file is responsible for writing the data into a log file named as the current date. If the file's size is greater than 3MB, it will be renamed containing the current time and another file will be created.

![code05](/docs/code05.JPG)

Each data is inserted as a Json Object inside the log file.

![code06](/docs/code06.JPG)

## To run this project

- Install packages:
  `npm install`
- Run API:
  `npm run dev`
- Acess URL:
  `http://localhost:3000`

![swagger](/docs/swagger.JPG)
