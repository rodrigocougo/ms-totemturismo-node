# lit-ms-company-node
#### Node.js Microservice to save companys
Microservice to save companys

## Common setup
Clone the repo and install the dependencies.

```bash
git clone https://gitlab.com/litonlearning/lit-ms-company-node.git
cd lit-ms-company-node
```

```bash
npm install
```

To run the microservice, is needed to configure the `.env` file like the sample:

```
#MONGO
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
MONGO_DATABASE=lit_company
```

To start the express server, run the following

```bash
npm run dev
```

Open [http://localhost:8081](http://localhost:8081) and take a look around.

## REST Endpoints of the Microservice
#### Search for companys at Microservice
`GET /company`
#### Create an company at Microservice
`POST /company`
#### Update an company at Microservice
`PUT /company/{companyId}`
#### Delete an company at Microservice
`DELETE /company/{companyId}`
#### Add a member to an company at Microservice
`PUT /company/{companyId}/addMember`
#### Remove a member of an company at Microservice
`PUT /company/{companyId}/removeMember`

### Documentation
[See](http://localhost:8081/ms-docs) the description of the methods, parameters and responses are available at the endpoint:<br>
`GET /ms-docs`