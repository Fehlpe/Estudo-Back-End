import express from "express";
import cors from "cors";
import { User, Transaction } from "./models/index";

const app = express();
const users: User[] = [];

app.use(express.json(), cors());

app.post("/users", (req, res) => {
  const { name, cpf, email, age } = req.body;

  if (!name || !cpf || !email || !age) {
    return res.status(400).json({
      success: false,
      message: "Dados obrigatórios não registrados",
    });
  } else {
    const cpfExists = users.some((user) => user.cpf === cpf);
    if (cpfExists) {
      return res.status(404).json({
        success: false,
        message: "CPF já esta em uso!",
      });
    }
    const user = new User(name, cpf, email, age);
    users.push(user);
    return res.status(200).json({
      success: true,
      data: user,
    });
  }
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Necessário informar ID",
    });
  } else {
    const user = users.find((user) => user.id == id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        age: user.age,
      },
    });
  }
});

app.get("/users", (req, res) => {
  const { name, email, cpf } = req.query;

  if (name) {
    const user = users.find((user) => user.name === name);

    if (user) {
      return res.status(200).json({
        sucess: true,
        data: {
          id: user.id,
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          age: user.age,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Nome não registrado no sistema",
      });
    }
  } else if (email) {
    const user = users.find((user) => user.email === email);

    if (user) {
      return res.status(200).json({
        sucess: true,
        data: {
          id: user.id,
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          age: user.age,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "E-mail não registrado no sistema",
      });
    }
  } else if (cpf) {
    const user = users.find((user) => user.cpf == cpf);

    if (user) {
      return res.json({
        sucess: true,
        data: {
          id: user.id,
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          age: user.age,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "CPF não registrado no sistema",
      });
    }
  } else {
    return res.json({
      sucess: true,
      data: users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          age: user.age,
        };
      }),
    });
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const indice = users.findIndex((user) => user.id == id);

  if (indice === -1) {
    return res.status(404).json({
      sucess: false,
      message: "Usuário não encontrado",
    });
  }

  users.splice(indice, 1);

  res.status(200).json({
    sucess: true,
    message: "Usuário removido",
  });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, cpf, email, age } = req.body;

  const user = users.find((user) => user.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Usuário não encontrado",
    });
  }

  name ? (user.name = name) : null;
  cpf ? (user.cpf = cpf) : null;
  email ? (user.email = email) : null;
  age ? (user.age = age) : null;

  res.status(200).json({
    success: true,
    data: user,
  });
});

app.post("/user/:id/transactions", (req, res) => {
  const { id } = req.params;
  const { title, value, type } = req.body;

  console.log(id, title, value, type);

  const user = users.find((user) => user.id == id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Usuário não encontrado",
    });
  }

  if (!title || !value || !type) {
    return res.status(404).json({
      success: false,
      message: "Dados obrigatórios não registrados",
    });
  }

  const transaction = new Transaction(title, value, type);

  user.transactions.push(transaction);

  return res.status(200).json({
    success: true,
    data: transaction,
  });
});

app.get("/user/:userId/transactions/:id", (req, res) => {
  const { userId, id } = req.params;

  const user = users.find((user) => user.id == userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Usuário não encontrado",
    });
  }

  const transaction = user.transactions.find(
    (transaction) => transaction.id == id
  );
  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transação não encontrada",
    });
  }

  return res.status(200).json({
    success: true,
    data: transaction,
  });
});

app.get("/users/:userId/transactions", (req, res) => {
  const { userId } = req.params;
  const { title, type } = req.query;

  const user = users.find((user) => user.id == userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Usuário não encontrado",
    });
  }

  let transactions = user.transactions;

  if (title && type) {
    return res.status(400).json({
      success: false,
      message: "Apenas um filtro pode ser aplicado por vez",
    });
  } else if (type) {
    const newTransactions = transactions.filter(
      (transaction) => transaction.type == type
    );
    if (!newTransactions) {
      return res.status(404).json({
        success: false,
        message: "Transação não encontrada",
      });
    }
    return res.status(200).json({
      success: true,
      data: newTransactions,
    });
  } else if (title) {
    const newTransactions = transactions.filter(
      (transaction) => transaction.title == title
    );
    if (!newTransactions) {
      return res.status(404).json({
        success: false,
        message: "Transação não encontrada",
      });
    }
    return res.status(200).json({
      success: true,
      data: newTransactions,
    });
  } else if (!type && !title) {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, transaction) => acc + transaction.value, 0);

    const outcome = transactions
      .filter((transaction) => transaction.type === "outcome")
      .reduce((acc, transaction) => acc + transaction.value, 0);

    const total = income - outcome;

    return res.status(200).json({
      success: true,
      data: {
        transactions,
        balance: {
          income,
          outcome,
          total,
        },
      },
    });
  }
});

app.delete("/users/:userId/transactions/:id", (req, res) => {
  const { userId, id } = req.params;
  const user = users.find((user) => user.id == userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Usuário não encontrado",
    });
  }
  const indice = user.transactions.findIndex(
    (transaction) => transaction.id == id
  );

  if (!indice) {
    return res.status(404).json({
      success: false,
      message: "Transação não encontrada",
    });
  }

  user.transactions.splice(indice, 1);

  res.status(200).json({
    sucess: true,
    message: "Transação removida",
  });
});

app.put("/users/:userId/transactions/:id", (req, res) => {
  const { userId, id } = req.params;
  const { title, value, type } = req.body;

  const user = users.find((user) => user.id == userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Usuário não encontrado",
    });
  }

  const transaction = user.transactions.find(
    (transaction) => transaction.id == id
  );
  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transação não encontrada",
    });
  }
  title ? (transaction.title = title) : null;
  value ? (transaction.value = value) : null;
  type ? (transaction.type = type) : null;

  res.status(200).json({
    success: true,
    data: transaction,
  });
});

app.listen(8081, () => console.log("Server OK"));
