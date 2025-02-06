## NodeJs&ExpressJs - Messages API

The application follows an organized folder structure to facilitate maintenance and scalability:

```code
src/
├── core/
├── infra/
├── modules/
└── shared/
```

### Folder details

```core/```

* Contains configurations related to the secure loading of environment variables.


```infra/```

* Centralizes all server configuration.</br>
* Implements the cluster module for multi-process management.</br>
* Configures graceful shutdown for safe server termination.</br>
* Configures Express and available routes.


`modules/`

* Houses the application modules. Each module is responsible for handling a specific application context.

`shared/`

Contains general reusable configurations and functionalities in the application, such as:

* Asynchronous logging function.
* Formatters for output standardization.
* Dependency injection configuration using containers.

## Environment setup

* `node: ~20.12`<br/>
* `yarn: ~1.22` (Remove this restriction from `package.json` if using `npm`)

Install dependencies:

`yarn`

Set up environment variables in the  `.env` file:

`DATABASE_URL=postgres://postgres:rpi1234@localhost:5432/postgres`

## Test Suit

Simply run the command:

`yarn test` 

## Spin up database
Using `docker-compose`:

`docker compose up -d`

## Running the Project

* Build
`yarn build`

* Run
`yarn start`