import { sign, verify } from "jsonwebtoken";
import { IToken } from "./token";
import { IUser } from "./user";

export class JWTtoken implements IToken {
  private SECRET_TOKEN = process.env.SECRET_KEY || "";

  create(data: IUser): string {
    const token = sign(
      {
        user: {
          _id: data._id.toString(),
          email: data.email,
          role: data.role,
        },
      },
      this.SECRET_TOKEN,
      {
        subject: data._id.toString(),
        expiresIn: "30m",
      }
    );
    return token;
  }

  validate(token: string): boolean {
    try {
      verify(token, this.SECRET_TOKEN);
      return true;
    } catch (err) {
      return false;
    }
  }
}
