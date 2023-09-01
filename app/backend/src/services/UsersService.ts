import * as bcrypt from 'bcryptjs';
import JWT from '../utils/JWT';

import IUsersModel from '../Interfaces/IUsersModel';
import UsersModelClass from '../models/UsersModelClass';
import { ILogin, IUser } from '../Interfaces/IUsers';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
// import { NewEntity } from '../Interfaces';
import { IToken } from '../Interfaces/IToken';

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UsersModelClass(),
    private stringInvalidMessage = 'Invalid email or password',
  ) { }

  // public async findAll(): Promise<ServiceResponse<IUserResponse[]>> {
  //   const allUsers = await this.usersModel.findAll();
  //   const usersReturn = allUsers.map(({ id, email, password, role, username }) => ({
  //     id, email, password, role, username }));

  //   return { status: 'SUCCESSFUL', data: usersReturn };
  // }

  // public async findById(id: number): Promise<ServiceResponse<IUserResponse>> {
  //   const user = await this.usersModel.findById(id);
  //   if (!user) return { status: 'NOT_FOUND', data: { message: 'User not found' } };
  //   const { email, role, username } = user as IUser;

  //   return { status: 'SUCCESSFUL', data: { id, email, role, username } };
  // }

  // public async createUser(user: NewEntity<IUser>):Promise<
  // ServiceResponse<IUserResponse | ServiceMessage>> {
  //   const userFound = await this.usersModel.findbyEmail(user.email);
  //   if (userFound) return { status: 'CONFLICT', data: { message: 'User already exists' } };
  //   const userPassword = bcrypt.hashSync(user.password, 10);
  //   const newUser = await this.usersModel.create({ ...user, password: userPassword });
  //   const { id, role, username, email } = newUser;
  //   return { status: 'SUCCESSFUL', data: { id, role, username, email } };
  // }

  public async getRoleByToken(userToken: { email: string }):Promise<
  ServiceResponse<IUser['role'] | ServiceMessage>> {
    if (!userToken.email) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }
    const user = await this.usersModel.findbyEmail(userToken.email);

    const { role } = user as IUser;

    return { status: 'SUCCESSFUL', data: role };
  }

  public async login(data: ILogin):Promise<
  ServiceResponse<IToken | ServiceMessage>> {
    const user = await this.usersModel.findbyEmail(data.email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: this.stringInvalidMessage } };

    if (data.email !== user.email) {
      return { status: 'UNAUTHORIZED', data: { message: this.stringInvalidMessage } };
    }

    const samePassword = bcrypt.compareSync(data.password, user.password);

    if (!samePassword) {
      return { status: 'UNAUTHORIZED', data: { message: this.stringInvalidMessage } };
    }

    const token = JWT.sign({ email: data.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
