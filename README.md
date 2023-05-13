# Loan Application App


## Approach
This is my solution to the Katas described in https://github.com/DemystData/code-kata. The App is divided into a _frontend_ build in React which communicates with a _backend_ NodeJS RESTful API.

The frontend side was implemented based on `create-react-app`, which provides a fully set up useful for starting a React project from scratch. It uses basic React state management through `useState`, nothing too complex. I've added a _React router_ to easily manage web page routing. As the loan application process progresses, different pages are shown on the screen, which allow to move through the different stages. I've included basic error handling for non HTTP 2XX responses.

The backend component was implemented in NodeJS and Typescript, using an _Hexagonal Architecture_ like approach. Through TS interfaces, I first come up with cohesive interfaces, which then are implemented in separate packages. This would ease replacing implementations for specific interfaces when needed.

The final resulting project is a good demonstration of what can I built in ~15 working hours.

### Frontend overview
- `src/components`: holds the fine grained components that can be reused across the different pages
- `src/layout`: holds the components related to general layout and webapp structure
- `src/pages`: holds the different pages to be rendered by the _router_
- `src/services`: packages functionality that isn't related to React rendering, but is used by components (e.g. API calls)

### Backend overview
- `db`: packages DB related functionality and settings. This project uses a _SQLite_ database supported through the _Knex_ utility
- `scripts`: common scripts for dealing with repetitive tasks
- `src/routes`: API routes definition
- `src/controllers`: controllers that will handle API requests
- `src/domain`: holds the entities and terms core to the domain definition. Carries out core domain logic
- `src/services`: specifies common facades and interfaces that group functionality depending on the Domain layer
- `src/repositories`: defines the common interfaces for communicating with a data source
- `src/impl`: holds the specific implementation of common abstract interfaces and dependencies the application depends on
- `src/network`: functionality related to pre/post-formatting of data before passing it over to the controllers or sending it over through the wire

Commands:
- `npm run build`: executes TS and generates a JS transpiled bundle
- `npm run test`: executes unit testing
- `npm run db:create`: creates a brand new DB structure (you should first remove the `db/mydb.sqlite` file first)

### Workflow
This is the workflow that better depicts how the project works:
1. From the initial screen, the user selects a company, an accounting system and enters an amount for the loan. A new company can be registered from there if the desired one isn't shown.
2. Once the user submits the initial data, the server asks for a balance sheet and temporarily stores an operation token, which should be used to further confirm the loan application. The user is redirected to a summary page to review the operation details.
3. The user can either cancel or confirm the operation. If cancelled, he'll be redirected to the initial screen. If confirmed, a new _loan application_ is stored in the server, the decision engine is executed and the user is presented with the result of the operation.


## App Setup

### Setup using local machine's Node
1. Setup the backend 
    1. Go to the `server` directory
    2. Run `npm install`
    3. Run `npm run start:dev`
2. Setup the frontend
    1. Go to the `client` directory
    2. Run `npm install`
    3. Run `npm run start`
3. App will be running on `http://localhost:4000`

### Setup using Docker Compose
1. Go to the main root project (which contains the _docker-compose_ file)
2. Run `docker compose up --build`
3. App will be running on `http://localhost:4000`