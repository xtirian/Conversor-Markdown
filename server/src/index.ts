import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const server = express();
const PORT = process.env.PORT;
server.use(express.json());

server.get("/", (req: Request, res: Response) => {
  res.send("Seja bem vindo a rota /");
});

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
