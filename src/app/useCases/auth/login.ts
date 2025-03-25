import { Request, Response } from "express";
import { User } from "../../models/User";

import { JWTtoken } from "../../shared/token/jwt.token";
import { PasswordBcrypt } from "../../shared/crypto/password.bcrypt";
import { sign } from "jsonwebtoken";
import { CreateConnectionRedis } from "../../shared/redis";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email or Password is missing!" });
      return;
    }

    const userAuth = await User.findOne({ email: email });

    if (!userAuth) {
      res.status(400).json({ error: "User does not exist!" });
      return;
    }

    const passwordCrypt = new PasswordBcrypt();
    const isMatchUser = await passwordCrypt.compare(
      password,
      userAuth.password
    );

    if (!isMatchUser) {
      res.status(400).json({ message: "Invalid Credentials!" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ error: "JWT secret is not configured!" });
      return;
    }

    const jwtService = new JWTtoken();
    const token = jwtService.create(userAuth);

    const { password: _, ...user } = userAuth.toObject();

    const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN || "";

    const refreshToken = sign({},
      refreshTokenSecret,
      {
        subject: user._id.toString(),
        expiresIn: "2d",
      }
    );

    const redisClient = new CreateConnectionRedis()
    await redisClient.setValue(String(user._id), refreshToken)

    res.status(200).json({ token, refreshToken, user });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
