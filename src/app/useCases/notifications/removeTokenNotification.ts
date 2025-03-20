import { Request, Response } from "express";
import { User } from "../../models/User";
import { TokenNotification } from "../../models/TokenNotification";

export async function removeTokenNotification(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const userExists = await User.findById(userId);
    if (!userExists) {
      res.status(404).json({ error: 'User not found.' });
      return
    }

    const tokenNotification = await TokenNotification.findOne({ userId: userId });

    if (!tokenNotification) {
      res.status(404).json({ error: 'Token notification not found for this user.' });
      return
    }

    tokenNotification.tokens = []

    await tokenNotification.save();

    res.status(200).json({ message: 'Token notification removed successfully.' });
    return
  }catch (error) {
    console.error('Error removing token notification:', error);
    res.status(500).json({ error: 'Internal server error while removing token notification.' });
    return
  }
}
