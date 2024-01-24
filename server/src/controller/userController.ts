import { Request, Response } from "express";
import { PrismaError, prisma } from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

export class User {
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // CHECA SE RECEBEMOS OS DADOS
    if (!name && !email && !password) {
      res.status(400).send({
        message: "Name, email, password inválidos",
      });

      return;
    }

    // CHECA SE O USUÁRIO EXISTE NO BANCO DE DADOS
    const checkEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (checkEmail) {
      res.status(401).send({
        message: "O usuário já existe",
      });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const create = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      if (create) {
        res.status(201).send(create);
      }
    } catch (error) {
      if (error instanceof PrismaError.PrismaClientKnownRequestError) {
        res.status(500).send({ message: "Internal Error" });
      }

      throw error;
    }
  }


  
  async logUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // CHECA SE RECEBEMOS OS DADOS
      if (!email && !password) {
        res.status(400).send({
          message: "Email, password inválidos",
        });

        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(401).send({
          message: "Usuário inexistente",
        });
        return;
      }

      const checarSenha = bcrypt.compareSync(password, user.password);

      if (!checarSenha) {
        res.status(401).send({
          message: "Senha Incorreta",
        });
        return;
      }

      const privateKey = fs.readFileSync("./.env").toString();

      const token = jwt.sign(
        {
          id: user.id,
        },
        privateKey,
        { expiresIn: "1d" }
      );

      const userAndToken = user && token;

      res.json(userAndToken);
    } catch (error) {
      if (error instanceof PrismaError.PrismaClientKnownRequestError) {
        res.status(500).send({ message: "Internal Error" });
      }

      throw error;
    }
  }
}
