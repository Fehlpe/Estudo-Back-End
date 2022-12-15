import { Request, Response, NextFunction } from "express";
import { User } from "../models/index";
import { users } from "../routes/routes";

const verifyUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  console.log(userId);

  const user = users.find((user) => user.id == userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Usuário não encontrado",
    });
  }

  next();
};

export default verifyUserMiddleware;
