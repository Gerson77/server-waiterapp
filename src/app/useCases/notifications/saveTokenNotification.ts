import { Request, Response } from "express";
import { TokenNotification } from "../../models/TokenNotification";
import { User } from "../../models/User";

export async function saveTokenNotification(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ error: 'Token é obrigatório' });
      return
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      res.status(400).json({ message: "User does not exist" });
      return
    }

    let userTokens = await TokenNotification.findOne({ userId });

    if (!userTokens) {
      userTokens = await TokenNotification.create({
        userId,
        tokens: [token],
      });
    } else if (!userTokens.tokens.includes(token)) {
      userTokens.tokens.push(token);
      await userTokens.save();
    }

    res.json(userTokens);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
