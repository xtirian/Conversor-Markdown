import { Markdown } from "./markdownType"


export type User = Partial<{
  userID: string,
  name: string,
  email: string,
  password: string,
  markdown: Markdown[]
}>