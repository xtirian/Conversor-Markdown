import { Request, Response, NextFunction } from "express";

async function authDocProducao(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { host } = req.headers;
  const { senha } = req.body;

  if (host !== undefined) {

    if (host.includes("localhost")) {
      //Se o dominio de entrar for localhost, ele não pedirá a senha
      return next();
    }

   //O usuario digitou a senha certa

    if (senha === process.env.SWAGGER_SENHA_DOC || req.originalUrl !== "/doc/" ) {
      return next();
    }

    //O usuario digitou asenha errada
    if (
      senha !== process.env.SWAGGER_SENHA_DOC &&
      senha !== undefined /* Necessário para dar o start no formulário */
    ) {
      res.status(401).set("Content-Type", "text/html"); // aqui retornaremos o status code 401 e estamos dizendo que vamos retornar um texto html
      res.send(
        Buffer.from(`
        <!DOCTYPE html>
      <form method="post">
        <p style="color: red;">Senha incorreta.</p>
        <label for="senha">Seha da Documentação:</label>
        <input type="password" name="senha" id="senha" />
      </form> 
         `)
      );
      //este send é pra enviar algo como resposta
    } else {
      //Usuário que ainda não digitou a senha e está em modo produção
      res.status(200).set("Content-Type", "text/html"); // aqui retornaremos o status code 401 e estamos dizendo que vamos retornar um texto html
      res.send(
        Buffer.from(`
        <!DOCTYPE html>
      <form method="post">
        <label for="senha">Seha da Documentação:</label>
        <input type="password" name="senha" id="senha" />
      </form>

    `)
      );
    }

  }
  

   
}

export default authDocProducao;
