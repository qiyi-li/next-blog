import { AppDataSource } from "./data-source.js";
AppDataSource.initialize().then(async aaa => {
  console.log("Inserting a new user into the database...", aaa);
  console.log("Here you can setup and run express / fastify / any other framework.");
}).catch(error => console.log(error));