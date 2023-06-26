# Course yourself

## Description

An workout application that provides:

- Exercises:
  - created by admins
  - used by users
- Workouts:
  - create your own workouts which can be repeated depends on your needs
  - (**not yet implemented**) soon notifications depends on preferences
- Groups:
  - join groups and (later - **not yet implemented**) share your workouts / chat with others
- Progress:
  - track your progresses depends on workouts /exercises done
- Analytics:
  - Dynamically created analytics (**not yet implemented**)

## Built with

- Nestjs (`v9.0`)
- Nodejs (`v20.2.0`)
- Casl (`v6`)
- Typeorm with mysql

## Installation

### Prerequisites

- application is tested with mysql(`v8.0.33`)
- download here: https://dev.mysql.com/downloads/windows/installer/8.0.html

Clone the repo

```sh
$ git clone https://github.com/Darosss/CourseYourself
```

then navigate to folder and run:

```sh
$ npm install
```

## Configuration

Make .env file as shown below or copy .env.example and fill needed variables

```
JWT_SECRET=jwtsecret
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=password
DATABASE_NAME=dbname
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Roadmap

- [] add private groups / workouts / progresses / notifications / analytics
  - [] add possibility for users to make above public / private
  - [] add permissions for above
- [] add server notifications alerts / reminders
- [] add limit created groups for users
- [] add limit for created workouts
- [] add group chats

## Contact

<p align="right">(<a href="#readme-top">back to top</a>)</p>

Darosss - darosss12@proton.me

Project Link: [https://github.com/Darosss/CourseYourself](https://github.com/Darosss/CourseYourself)
