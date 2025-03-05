import bcrypt from "bcryptjs";
import { IPassword } from "./password.crypto";

export class PasswordBcrypt implements IPassword {
  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
