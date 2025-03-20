import { Request, Response } from "express";
import { User } from "../../models/User";

import { PasswordBcrypt } from "../../shared/crypto/password.bcrypt";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    const passwordHash = await new PasswordBcrypt().hash(password)

    const users = await User.create({
      name, email, password: passwordHash, role
    });

    res.json(users);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
}

