import { verify, sign } from "jsonwebtoken";
import { CreateConnectionRedis } from "../redis";
import { User } from "../../models/User";
import { JWTtoken } from "./jwt.token";

export class RefreshToken {
  async execute(refreshToken: string){
    const secretKeyRefreshToken = process.env.SECRET_KEY_REFRESH_TOKEN || ''
    try {
      const { sub } = verify(refreshToken, secretKeyRefreshToken)

      const redisClient = new CreateConnectionRedis()
      const refreshTokenRedis = await redisClient.getValue(String(sub))

      if(refreshToken !== refreshTokenRedis) {
        throw new Error('Refres token incorrect')
      }

      const user = await User.findById({ _id: sub })

      if(!user) {
        throw new Error('User does not exists!')
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT secret is not configured!");
      }

      const jwtService = new JWTtoken();
      const tokenGenerated = jwtService.create(user);

      const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN || "";

      const newRefreshToken = sign({},
        refreshTokenSecret,
        {
          subject: user._id.toString(),
          expiresIn: "2d",
        }
      );

      await redisClient.setValue(String(user._id), newRefreshToken)

      console.log({
        token: tokenGenerated,
        refreshToken: newRefreshToken,
      })

      return {
        token: tokenGenerated,
        refreshToken: newRefreshToken,
      }
    }catch {
      throw new Error('Token incorrect')
    }
  }
}
