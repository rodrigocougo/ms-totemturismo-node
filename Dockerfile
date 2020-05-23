FROM node:10.13-alpine

WORKDIR /lit-ms-company

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run dev