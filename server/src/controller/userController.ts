import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class User {
  async createUser(req: Request, res: Response) {
    const user = req.body;
    const create = await prisma.user.create({
      data: user,
    });
    res.status(201).send(create);
  }
  async getUser(req: Request, res: Response) {
    const user = await prisma.user.findMany({});
    res.status(200).send(user);
    console.log(user);
  }
}
