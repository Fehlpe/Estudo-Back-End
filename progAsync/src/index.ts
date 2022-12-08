// --------------------------------------------------------------------- EXERCICIO 1 ------------------------------

import axios from "axios";
async function getUserFromGithub(user: string) {
  try {
    const response = await axios.get(`https://api.github.com/users/${user}`);
    console.log(response.data);
  } catch (err) {
    console.log("Usuário não existe");
  }
}

// getUserFromGithub("djunior97");
// getUserFromGithub("djunioriqdivqv97");

async function getRepositories(repo: string) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repo}`);
    console.log(response.data);
  } catch (err) {
    console.log("Repositório não existe");
  }
}

// getRepositories("marcelo-growdev/scrapbook-es6");
// getRepositories("marcelo-growdev/qdbqqbqwn");

// --------------------------------------------------------------------- EXERCICIO 2 ------------------------------

// DESCOMENTAR O CODIGO TODO PARA FUNCIONAR

// import express, {Express, query, Request, Response} from 'express';
// const server: Express = express();

// server.use(express.json())

// server.get('/calculadora', (req: Request, res: Response) => {
//     const operacao = req.query.operacao
//     const valorA = req.query.valorA
//     const valorB = req.query.valorB
//     const numA = Number(valorA)
//     const numB = Number(valorB)
//     let resultado
//     switch(operacao) {
//         case "somar":
//             resultado = numA + numB
//             break
//         case "subtrair":
//             resultado = numA - numB
//             break
//         case "multiplicar":
//             resultado = numA * numB
//             break
//         case "dividir":
//             resultado = numA / numB
//             break
//         default:
//             res.send("seloco")
//             break
//     }
//     res.send(resultado?.toString())
// })

// server.listen(8081, () => {
//     console.log("Servidor OK");
//   });

// --------------------------------------------------------------------- EXERCICIO 3 ------------------------------

// DESCOMENTAR O CODIGO TODO PARA FUNCIONAR

// import express, {Express, query, Request, Response} from 'express';
// const server: Express = express();

// let contador = 0;

// server.get('/contador', (req: Request, res: Response) => {
//   contador++;

//   res.send(contador.toString())

//   if (contador === 10) {
//     console.log('Chegou à 10');
//     contador = 0;
//   }
// });

// server.listen(8083, () => {
//   console.log(`Server OK`);
// });

// --------------------------------------------------------------------- EXERCICIO 4 ------------------------------

// DESCOMENTAR O CODIGO TODO PARA FUNCIONAR

// import express, { Express, query, Request, Response } from "express";
// const server: Express = express();

// server.get("/numeral", (req: Request, res: Response) => {
//   const { numero, operacao } = req.query;
//   let resultado;

//   const num = Number(numero);

//   if (operacao === "anterior") {
//     resultado = num - 1;
//   } else if (operacao === "proximo") {
//     resultado = num + 1;
//   } else {
//     res.status(400).send({ error: "Operação inválida" });
//   }

//   res.send(resultado?.toString());
// });

// server.listen(8084, () => {
//   console.log(`Server OK`);
// });
