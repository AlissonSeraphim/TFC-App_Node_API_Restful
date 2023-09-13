# [PT-BR] TFC - Tabela de Campeonato de Futebol (Estilo CartolaFC)

O TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

Foi desenvolvido uma API (utilizando o método TDD) e também integrado - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, foi construido um back-end dockerizado utilizando modelagem de dados através do Sequelize. Seu desenvolvimento respeita as regras de negócio providas no projeto e sua API é consumida por um front-end já provido nesse projeto.

O back-end é responsável por implementar as regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema. O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ Banco de Dados:

- É um container docker MySQL já configurado no docker-compose através de um serviço definido como db.
- Tem o papel de fornecer dados para o serviço de backend.
- Durante a execução dos testes sempre vai ser acessado pelo sequelize e via porta 3306 do localhost.
- Pode ser conectado a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço db.

2️⃣ Back-end:

- Roda na porta 3001, pois o front-end faz requisições para ele nessa porta por padrão.
- A aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`.
- Garanta que o Express.js é executado e a aplicação ouve a porta que vem das variáveis de ambiente.

3️⃣ Front-end:

- Todos os testes a partir do requisito de login usam o Puppeteer para simular uma pessoa acessando o site http://localhost:3000/.
- O front-end se comunica com serviço de back-end pela URL http://localhost:3001 através dos endpoints já construidos.

4️⃣ Docker:

- O docker-compose tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`.
- Utilize os scripts de apoio `npm run compose:up` e `npm run compose:down` para facilitar a execução do compose.

## Tecnologias Utilizadas

- TypeScript: linguagem que adiciona tipagem estática ao JavaScript, utilizado para garantir maior robustez e integridade do código.
- Node.js: plataforma de desenvolvimento em JavaScript do lado do servidor.
- Express.js: framework web para construção de APIs.
- Sequelize: ORM (Object-Relational Mapping) para modelagem de dados e acesso ao banco de dados MySQL.
- Docker: plataforma para empacotar, distribuir e executar aplicações em containers.
- Puppeteer: biblioteca de automação de navegador para testes.
- bcryptjs: biblioteca para criptografia de senhas.
- Mocha: framework de testes para JavaScript.
- Chai: biblioteca de assertividade para testes em JavaScript.
- Sinon: biblioteca para testes de stubs, spies e mocks em JavaScript.
  
O projeto implementou os princípios da Programação Orientada a Objetos (POO), garantindo um design sólido e expansível para as Models.

Foram criados testes abrangentes para todas as etapas do projeto, com uma cobertura total de mais de 90%.

## Sequelize e Banco de Dados

O Sequelize, um ORM (Object-Relational Mapping), foi utilizado para lidar com a camada de banco de dados do projeto. Isso proporcionou uma abstração eficiente e facilitou a modelagem das entidades do sistema.

### Modelagem de Dados

Foram criadas as seguintes models utilizando o Sequelize:

#### `MatchesModel`

A model `MatchesModel` representa informações relacionadas às partidas de futebol. A sua estrutura inclui os seguintes campos:

- `id` (INTEGER): Identificador único da partida.
- `homeTeamId` (INTEGER): ID do time da casa.
- `homeTeamGoals` (INTEGER): Quantidade de gols marcados pelo time da casa.
- `awayTeamId` (INTEGER): ID do time visitante.
- `awayTeamGoals` (INTEGER): Quantidade de gols marcados pelo time visitante.
- `inProgress` (BOOLEAN): Indica se a partida está em andamento.

#### `UsersModel`

A model `UsersModel` representa informações das pessoas usuárias do sistema. A sua estrutura inclui os seguintes campos:

- `id` (INTEGER): Identificador único da pessoa usuária.
- `username` (STRING): Nome de usuário da pessoa.
- `role` (STRING): Cargo ou função da pessoa no sistema.
- `email` (STRING): Endereço de e-mail da pessoa.
- `password` (STRING): Senha da pessoa.

#### `TeamsModel`

A model `TeamsModel` representa informações dos times de futebol. A sua estrutura inclui os seguintes campos:

- `id` (INTEGER): Identificador único do time.
- `teamName` (STRING): Nome do time.

### Relações entre Models

O Sequelize foi configurado para estabelecer relações entre as models, permitindo uma estrutura de banco de dados coesa e funcional. As relações entre as models são as seguintes:

- `TeamsModel` possui muitas partidas como time da casa (`homeTeam`) e muitas partidas como time visitante (`awayTeam`).

- `MatchesModel` pertence a um time da casa (`homeTeam`) e pertence a um time visitante (`awayTeam`).

Essas relações foram estabelecidas através de chaves estrangeiras, permitindo consultas e operações eficientes entre as entidades relacionadas.

A utilização do Sequelize e a configuração adequada das models e relações contribuíram para um banco de dados bem estruturado e de fácil manutenção.


## Requisitos

Este projeto é composto por 4 fluxos principais:

### Fluxo 1: Times
- Consumir a rota `/times` para retornar os nomes dos times associados às partidas para renderização no frontend.

### Fluxo 2: Usuários e Login
- Implementar a rota `/login`.
- Validar campos de email e senha no banco de dados.
- Os campos de email devem receber um email válido e senha com mais de 6 caracteres.
- Realizar o login apenas se as credenciais estiverem registradas no banco de dados.

### Fluxo 3: Partidas
- Implementar o modelo e as rotas relacionadas à entidade Partida(Matches).
- Realizar validações do token.

### Fluxo 4: Placares
- Construir a classificação dos times com base nas regras de negócio especificadas.
- Realizar todos os cálculos e regras no backend, com a renderização das informações no frontend.


## Contato

- LinkedIn: [AlissonTassi](https://www.linkedin.com/in/alissontassi/)
- GitHub: [AlissonSeraphim](https://github.com/AlissonSeraphim)

## Licença

Este projeto não possui licença.

# [EN] TFC - Soccer Championship Table

TFC is an informational website about football matches and standings! ⚽️

An API was developed (using the TDD method), and the applications were integrated - through docker-compose - to ensure they function by consuming a database.

In this project, a dockerized backend was built using data modeling through Sequelize. Its development adheres to the business rules provided in the project, and its API is consumed by a frontend also provided in this project.

The backend is responsible for implementing the business rules to populate the table available on the frontend, which will be displayed to the end user of the system. The project consists of 4 important entities for its structure:

1️⃣ Database:

- It is a MySQL docker container already configured in docker-compose through a service defined as db.
- Its role is to provide data to the backend service.
- During the execution of tests, it will always be accessed through Sequelize and via port 3306 of localhost.
- It can be connected to a MySQL client (Workbench, Beekeeper, DBeaver, etc.) by providing the credentials configured in the docker-compose service db.

2️⃣ Backend:

- Runs on port 3001, as the frontend makes requests to it on this port by default.
- The application should be initialized from the `app/backend/src/server.ts` file.
- Ensure that Express.js is running, and the application listens on the port specified in the environment variables.

3️⃣ Frontend:

- All tests starting from the login requirement use Puppeteer to simulate a person accessing the website http://localhost:3000/.
- The frontend communicates with the backend service via the URL http://localhost:3001 through the already constructed endpoints.

4️⃣ Docker:

- The docker-compose is responsible for uniting all containerized services (backend, frontend, and db) and launching the complete project with the `npm run compose:up` command.
- Use the supporting scripts `npm run compose:up` and `npm run compose:down` to facilitate the execution of the compose.

## Technologies Used

- TypeScript: a language that adds static typing to JavaScript, used to ensure code robustness and integrity.
- Node.js: a server-side JavaScript development platform.
- Express.js: a web framework for building APIs.
- Sequelize: an ORM (Object-Relational Mapping) for data modeling and MySQL database access.
- Docker: a platform for packaging, distributing, and running applications in containers.
- Puppeteer: a browser automation library for testing.
- bcryptjs: a library for password encryption.
- Mocha: a testing framework for JavaScript.
- Chai: an assertiveness library for JavaScript tests.
- Sinon: a library for stubs, spies, and mocks in JavaScript.

The project implemented the principles of Object-Oriented Programming (OOP), ensuring a solid and expandable design for the Models.

Comprehensive tests were created for all stages of the project, with a total coverage of over 90%.

## Sequelize and Database

Sequelize, an Object-Relational Mapping (ORM), was used to handle the database layer of the project. This provided an efficient abstraction and simplified the modeling of system entities.

### Data Modeling

The following models were created using Sequelize:

#### `MatchesModel`

The `MatchesModel` model represents information related to football matches. Its structure includes the following fields:

- `id` (INTEGER): Unique identifier of the match.
- `homeTeamId` (INTEGER): ID of the home team.
- `homeTeamGoals` (INTEGER): Number of goals scored by the home team.
- `awayTeamId` (INTEGER): ID of the away team.
- `awayTeamGoals` (INTEGER): Number of goals scored by the away team.
- `inProgress` (BOOLEAN): Indicates whether the match is in progress.

#### `UsersModel`

The `UsersModel` model represents information about system users. Its structure includes the following fields:

- `id` (INTEGER): Unique identifier of the user.
- `username` (STRING): User's username.
- `role` (STRING): User's role or function in the system.
- `email` (STRING): User's email address.
- `password` (STRING): User's password.

#### `TeamsModel`

The `TeamsModel` model represents information about football teams. Its structure includes the following fields:

- `id` (INTEGER): Unique identifier of the team.
- `teamName` (STRING): Team's name.

### Relationships between Models

Sequelize was configured to establish relationships between the models, allowing for a cohesive and functional database structure. The relationships between the models are as follows:

- `TeamsModel` has many matches as the home team (`homeTeam`) and has many matches as the away team (`awayTeam`).

- `MatchesModel` belongs to a home team (`homeTeam`) and belongs to an away team (`awayTeam`).

These relationships were established through foreign keys, enabling efficient queries and operations between related entities.

The use of Sequelize and the proper configuration of models and relationships contributed to a well-structured and easily maintainable database.

## Requirements

This project consists of 4 main flows:

### Flow 1: Teams
- Consume the `/times` route to return the names of teams associated with matches for rendering on the frontend.

### Flow 2: Users and Login
- Implement the `/login` route.
- Validate email and password fields in the database.
- Email fields must receive a valid email, and passwords must be longer than 6 characters.
- Perform login only if the credentials are registered in the database.

### Flow 3: Matches
- Implement the model and routes related to the Match entity.
- Perform token validations.

### Flow 4: Leaderboard
- Build the teams standings based on the specified business rules.
- Perform all calculations and rules on the backend, rendering the information on the frontend.

## Contact

- LinkedIn: [AlissonTassi](https://www.linkedin.com/in/alissontassi/)
- GitHub: [AlissonSeraphim](https://github.com/AlissonSeraphim)

## License

This project does not have a license.

