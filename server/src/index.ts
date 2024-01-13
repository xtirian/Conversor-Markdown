//SERVER CONFIG IMPORTS
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import logger from "morgan";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger("dev"));
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));



// SWAGGER CONFIG
import swaggerUI from "swagger-ui-express";
import authDocProducao from "./middleware/authDoc";
const swaggerOptions = { customCssUrl: "swagger-ui.css" };
import swaggerFile from "./doc/swagger_output.json";

// SWAGGER RETURN
if (process.env.NODE_ENV) {
  server.get("/", (req: Request, res: Response) => {
    /**#swagger.ignore=true */ res.redirect("/doc");
  });

  server.use(
    "/doc",
    authDocProducao,
    swaggerUI.serve,
    swaggerUI.setup(swaggerFile, swaggerOptions)
  );
}

// CALL ROUTES


// SERVER INIT
if (process.env.NODE_ENV) {
  server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
}
