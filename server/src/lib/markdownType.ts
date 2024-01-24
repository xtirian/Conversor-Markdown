import { User } from "./userType";


export type Markdown = Partial<{
   id: number,
  name: string,
  contentHTML: string,
  contentMark: string,
  author: User,
  authorId: number

}>