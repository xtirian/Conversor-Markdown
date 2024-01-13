import path from "path";
import swaggerAutogen from "swagger-autogen";

swaggerAutogen({
  openapi: "3.0.0",
  language: "pt-BR",
});

const outputFile = "./swagger-output.json"; // Here I'm pointing where is created the documentation

const endpointsFiles = [path.join("../src/server.ts")]; // In this array I'm poiting to the routes of our project.



const doc = {
  info: {
    version: "1.0.0",
    title: "Desafio-Matheus Fernandes Cunha",
    description: "Descrição do projeto",
  },
  servers: [
    {
      url: `ttp://localhost:${process.env.PORT}`,
      description: "Develop server",
    },
    {
      url: `${process.env.URL}`, //TODO: update after we have the deploy
      description: "Production server",
    },
  ],
  consumes: ["application/json"],
  produces: ["application/json"],
}; // this function calls for doc update

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  require("../server.ts");
});
