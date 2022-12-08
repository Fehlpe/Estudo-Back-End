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

import express, {Express, query, Request, Response} from 'express';
import { json } from "stream/consumers";
const server: Express = express();

server.use(express.json())

server.get('/calculadora', (req: Request, res: Response) => {
    const operacao = req.query.operacao
    const valorA = req.query.valorA
    const valorB = req.query.valorB
    const numA = Number(valorA) 
    const numB = Number(valorB) 
    let resultado
    switch(operacao) {
        case "somar":
            resultado = numA + numB
            break
        case "subtrair":
            resultado = numA - numB
            break
        case "multiplicar":
            resultado = numA * numB
            break
        case "dividir":
            resultado = numA / numB
            break
        default:
            res.send("seloco")
            break
    }
    res.send(resultado?.toString())
})

server.listen(8081, () => {
    console.log("Servidor OK");
  });