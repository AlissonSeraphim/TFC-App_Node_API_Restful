import { Identifiable } from '.';

export default interface IUsers {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface ILogin {
  email: string,
  password: string,
}

export interface IUser extends Identifiable, ILogin {
  role: string,
  username: string,
}

export type IUserResponse = Omit<IUser, 'password'>;
