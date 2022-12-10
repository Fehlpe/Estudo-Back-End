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
const server: Express = express();

server.use(express.json())

server.get('/calculadora', (req: Request, res: Response) => {
  const operacao = req.query.operacao
  const valorA = req.query.valorA
  const valorB = req.query.valorB
 
  if (!operacao || !valorA || !valorB) {
      res.send("Operação, valor A, e valor B são parâmetros obrigatórios!")
  } else {
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
              res.send("Operação Invalida")
              break
      }
      res.send(resultado?.toString())
  }
})

server.listen(3000, () => {
    console.log("Servidor OK");
  });

// --------------------------------------------------------------------- EXERCICIO 3 ------------------------------

let contador = 0;

server.get('/contador', (req: Request, res: Response) => {
  contador++;

  res.send(contador.toString())

  if (contador === 10) {
    console.log('Chegou à 10');
    contador = 0;
  }
});

// --------------------------------------------------------------------- EXERCICIO 4 ------------------------------

// DESCOMENTAR O CODIGO TODO PARA FUNCIONAR

server.get("/numeral", (req: Request, res: Response) => {
  const { numero, operacao } = req.query;
  // Verifica se o parâmetro numero foi fornecido e é um número válido
  if (!numero) {
    res.status(400).send({ error: "Número é um parâmetro obrigatório!" });
  }
  // Verifica se o parâmetro operacao é válido
  else if (operacao !== "anterior" && operacao !== "proximo") {
    res.status(400).send({ error: "Operação inválida! Os valores válidos são 'anterior' ou 'proximo'" });
  }
  else {
    const num = Number(numero);
    let resultado;

    if (operacao === "anterior") {
      resultado = num - 1;
    } else if (operacao === "proximo") {
      resultado = num + 1;
    }

    res.send(resultado?.toString());
  }
});


// --------------------------------------------------------------------- EXERCICIO 5 ------------------------------

server.get('/inverter-string', (req: Request, res: Response) => {
  const { valor } = req.query;

  if (!valor) {
    res.status(400).send({ error: 'O parâmetro "valor" é obrigatório' });
    return;
  }

  const stringInvertida = valor!.toString().split('').reverse().join('');
  res.send(stringInvertida);

});


// --------------------------------------------------------------------- EXERCICIO 6 ------------------------------

const arraySemVogal: string[] = [];

server.get('/remover-vogais', (req: Request, res: Response) => {
  const { valor } = req.query;
  if (!valor) {
    res.status(400).send({ error: "Valor é um parâmetro obrigatório!" });
  } else {
    const stringSemVogais = valor.toString().replace(/[aeiou]/gi, '');
    arraySemVogal.push(stringSemVogais);
    res.send(arraySemVogal);
  }
});
