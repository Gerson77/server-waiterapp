import { Request, Response } from "express";
import { RefreshToken } from "../../shared/token/refreshToken";

export async function refreshAuth(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    const refreshTokenclass = new RefreshToken()

    const result = await refreshTokenclass.execute(refreshToken)

    res.status(200).json(result)
  }catch {
    res.status(401).json({ error: 'Token incorrect or invalid!'})
  }
}
