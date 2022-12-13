import express from "express";
import cors from "cors";
import { User, Transaction } from "./models/index";

const app = express();
const users: User[] = [];

app.use(express.json(), cors());

app.post("/users", (req, res) => {
  const { name, cpf, email, age } = req.body;

  if (!name || !cpf || !email || !age) {
    res.status(400).json({ error: "Dados obrigatórios não registrados" });
  } else {
    const cpfExists = users.some((user) => user.cpf === cpf);
    if (cpfExists) {
      return res.status(400).json({ error: "CPF já está em uso" });
    }
    const user = new User(name, cpf, email, age);
    users.push(user);
    return res.json(user);
  }
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(418).json({ error: "Necessário informar ID" });
  } else {
    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).send("Usuário não encontrado.");
    }

    res.send(user);
  }
});

app.get("/users", (req, res) => {
  const { name, email, cpf } = req.query;

  if (name) {
    const user = users.find((user) => user.name === name);
    
    if(user){
        return res.json({
            sucesso: true,
            data:{
                      id: user.id,
                      name: user.name,
                      cpf: user.cpf,
                      email: user.email,
                      age: user.age,
                  }
                
        });
    } else {
        res.status(400).json({ error: "Nome não registrado no sistema"})
    }
  } else if (email) {
    return res.json({
      sucesso: true,
      data: users.filter((user) => user.email === email),
    });
  } else if (Number(cpf)) {
    return res.json({
      sucesso: true,
      data: users.filter((user) => user.cpf === cpf),
    });
  } else {
    return res.json({
      sucesso: true,
      data: users,
    });
  }
});

app.listen(8081, () => console.log("Server OK"));
