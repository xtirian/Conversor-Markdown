import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class Markdown {
  async postMarkdown(req: Request, res: Response) {
    const { name, contentHtml, contentMark, authorId } = req.body;
    const data = {
      name: name,
      contentHtml: contentHtml,
      contentMark: contentMark,
      authorId: authorId,
    };
    const create = await prisma.markdown.create({
      data,
    });

    res.status(201).json(create);
  }

  async getMarkdown(req: Request, res: Response) {
    const markedown = await prisma.markdown.findMany();
    res.status(200).json(markedown);
  }

  async putMarkdown() {}
  async deleteMarkdown() {}
}
