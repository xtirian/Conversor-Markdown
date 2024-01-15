import { Router } from "express";
import { Markdown } from "../controller/markdownController";

export const routerContent = Router();
const markdown = new Markdown();

routerContent.post("/content", markdown.postMarkdown);
routerContent.get("/content", markdown.getMarkdown);
