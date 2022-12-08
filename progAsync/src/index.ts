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
