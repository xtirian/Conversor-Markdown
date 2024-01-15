//SERVER CONFIG IMPORTS
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import logger from "morgan";
<<<<<<< HEAD
import { userRouter } from "./routes/user";
import { routerContent } from "./routes/content";
=======

>>>>>>> eabbd332e77be20a4119fd614c2dce2b4c3e3254
dotenv.config();

const PORT = process.env.PORT || 4000;

const server = express();

server.use(express.json());
server.use(cors());
server.use(logger("dev"));
server.use(express.urlencoded({ extended: false }));
<<<<<<< HEAD
server.use(express.static(path.join(__dirname, "public")));
server.use(userRouter);
server.use(routerContent);

// SWAGGER CONFIG
import swaggerUI from "swagger-ui-express";
import authDocProducao from "./middleware/authDoc";
const swaggerOptions = { customCssUrl: "swagger-ui.css" };
import swaggerFile from "./doc/swagger_output.json";

=======
server.use(express.static(path.join(__dirname, 'public')));



// SWAGGER CONFIG
import swaggerUI from "swagger-ui-express";
import authDocProducao from "./middleware/authDoc";
const swaggerOptions = { customCssUrl: "swagger-ui.css" };
import swaggerFile from "./doc/swagger_output.json";

>>>>>>> eabbd332e77be20a4119fd614c2dce2b4c3e3254
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

<<<<<<< HEAD
=======

>>>>>>> eabbd332e77be20a4119fd614c2dce2b4c3e3254
// SERVER INIT
if (process.env.NODE_ENV) {
  server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
}
