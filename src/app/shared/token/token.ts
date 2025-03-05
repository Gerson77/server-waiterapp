import { IUser } from "./user";

export interface IToken {
  create(data: IUser): string;
  validate(token: string): boolean;
}
