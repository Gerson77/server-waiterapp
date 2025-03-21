import { Request, Response } from "express";
import { User } from "../../models/User";

export async function listUsers(req: Request, res: Response) {
  try {
    const users = await User.find().select("_id name email role");

    res.json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
