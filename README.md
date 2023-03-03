# Storefront Backend Project

### Project Summary

Your company's stakeholders have requested that you and your co-worker construct an online store where customers can buy their exceptional product concepts.

The stakeholders have put together a list of [requirements](REQUIREMENTS.md) for this online store.

To prepare the application for beta testing, it must have robust testing procedures in place, ensure the security of user information, and generate user authentication tokens that are readily integrable with the frontend.

## Table of Contents

1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    2. [Environment Setup](#environment-setup)
    3. [Project Setup](#project-setup)
    4. [Running the App](#running-the-app)
2. [Project Scripts](#project-scripts)
3. [Endpoints](#endpoints)
4. [Database Schema](#database-schema)

## Getting Started

These instructions will help you to run the project on your local machine for development and testing
purposes.

### Prerequisites

1. [node](https://nodejs.org/en/)  👉👉  ``To Run The Application.``
2. [docker](https://www.docker.com/products/docker-desktop/)
   👉👉  ``Install Docker to Run Postgres Database with docker-compose.``

> Note: You can ignore docker installation and install postgresql on your machine.

### Environment Setup

**``.env`` Structure**

```bash
# App Configuration
PORT=3000
NODE_ENV=development
# DB Configuration
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB="DATABASE_NAME for Dev"
POSTGRES_DB_TEST="DATABASE_NAME for Test"
POSTGRES_USER="DATABASE USERNAME"
POSTGRES_PASSWORD="DATABASE PASSWORD"
# Bcrypt Configuration
BCRYPT_PASSWORD="YOUR SECRET PASSWORD"
SALT_ROUNDS=10
# JWT Configuration
JWT_SECRET="YOUR SECRET PASSWORD FOR TOKEN"
```

### Project Setup

**Install Dependencies**

```bash
npm install
```

**Start Postgres Server (on Docker)**

```bash
docker-compose up
```

**Create the Database, if not already created**

```postgresql
CREATE DATABASE storefront; -- For Development purposes
CREATE DATABASE storefront_test; -- For Testing purposes
```

**Run database Migrations**

```bash
npm run migrate:up
```

### Running the App

**Run the Application on development mode** 👉👉 App will run on [http://localhost:3000](http://localhost:3000)

```bash
npm run dev
```

**Build the Application for production and start it**

```bash
npm run start
```

## Project Scripts

### Project setup

```bash
npm install
```

### Start the server for development

```bash
npm run dev
```

### Compiles and minifies for production

```bash
npm run build
```

### Start the server after build `production`

```bash
npm run start
```

### Run the unit tests

```bash
npm run test
```

### Run the database migrations

```bash
npm run migrate:up    # Create the database schema
npm run migrate:down  # Drop the database tables
```

### Lints and run prettier to auto format

```bash
npm run format
```

```bash
npm run lint
```

### Lints and fixes files

```bash
npm run lint:fix
```

## Endpoints

See [REQUIREMENTS.md](REQUIREMENTS.md) file

## Database Schema

See [REQUIREMENTS.md](REQUIREMENTS.md) file
