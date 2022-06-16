# exnaton-backend

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

This is a REST API for the [exnaton](https://exnaton.com) backend. It provides endpoints for creating and retriveing Smart Meters and their readings. It performs data transformation on the raw readings so the frontend can display them in a more readable format. It groups the readings by day and provides a summary of the readings for each day. It was written in Node.js and uses the [Express](https://expressjs.com) framework and Postgres for the database. To interact with the dabase it uses Typeorm for the ORM.

### Installing

Clone the project into your machine and install the dependencies with your preferred tool.

```
yarn install
```

You can start both the server and the database separately or you can spin up Docker-compose.

### Starting the server and the database separately

To start the server:

```
yarn build && yarn dev
```

To start the database in a Docker container:

```
docker run --name db-name -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -p 5432:5432 -d postgres
```

You will need to run the migrations manually. You can do so by running the following command:

```
yarn typeorm migration:run -d dist/database/index.js
```

### Starting the server and the database with Docker-compose

Just start the Docker-compose file:

```
Docker-compose up
```

### TypeORM

Here are a couple commands to help you with the database:

- To create a new migration file:

```
yarn typeorm migration:create src/database/migrations/CreateMeasurementTable
```

- To run the migrations:

```
yarn typeorm migration:run -d dist/database/index.js
```

## Usage <a name = "usage"></a>

As of now, the backend only supports the following endpoints:

- POST /api/v1/smartmeter - Create a new smart meter

```curl
curl --request POST \
  --url http://localhost:3000/api/v1/smartmeters
```

- GET /api/v1/smartmeter - Get all smart meters

- POST /api/v1/meterdata/measurement - Insert and array of measurements

```curl
curl --request POST \
  --url http://localhost:3000/api/v1/meterdata/measurement \
  --header 'Content-Type: application/json' \
  --data '[
		{
			"measurement": "energy",
			"0100011D00FF": 0.0844,
			"0100021D00FF": 0,
			"tags": {
				"muid": "53d63d3d-1b29-49a6-8e5f-537c730f4d11"
			},
			"timestamp": "2022-05-01T00:00:00.000Z"
		}
	]'
```

- GET /api/v1/meterdata/measurement - Get all measurements for a smart meter
