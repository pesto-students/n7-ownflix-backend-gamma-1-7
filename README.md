# NINJA-TEMPLATE

# WatchFlix API

## Pre-requisites

- Nodejs 10+
- Git

## Getting Started

- Clone the repo
- `cd project directory`
- `npm install`

## Setup Code

- Rename `example.env` file to `.env` <br />
- Add connection string of mongodb database in .env

## Starting app

- `yarn start` or `npm start` to start dev server
- API server is ready at http://localhost:3000
- Acces API documentation https://localhost:3000/apiDocs
- Provide the `x-api-key` (Frontend and Backend X-API-KEY will be the same)

## Tech Stack

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **CI**: continuous integration with [Github Actions](https://circleci.com/)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)

## Commands

Running locally:

```bash
yarn start:dev
```

Running in production:

```bash
yarn start:prod
```

Testing:

```bash
yarn test
```
