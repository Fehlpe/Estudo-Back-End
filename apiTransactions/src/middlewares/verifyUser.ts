import { Router, Request, Response, NextFunction } from "express";
import { User, Transaction } from "../models/index";

export default function verifyUserMiddleware(users: User[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const user = users.find((user) => user.id == userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    next();
  };
}
