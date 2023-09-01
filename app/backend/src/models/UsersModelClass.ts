// import { NewEntity } from '../Interfaces';
import UsersModel from '../database/models/UsersModel';
import IUsers from '../Interfaces/IUsers';
import IUserModel from '../Interfaces/IUsersModel';

export default class UsersModelClass implements IUserModel {
  private model = UsersModel;

  // async findAll(): Promise<IUsers[]> {
  //   const dbData = await this.model.findAll();

  //   return dbData.map(({ id, email, password, role, username }) => (
  //     { id, email, password, role, username }
  //   ));
  // }

  // async findById(id: IUsers['id']): Promise<IUsers | null> {
  //   const user = await this.model.findByPk(id);

  //   if (!user) return null;

  //   const { email, password, role, username } = user;
  //   return { id, email, password, role, username };
  // }

  // async create(data: NewEntity<IUsers>): Promise<IUsers> {
  //   const user = await this.model.create(data);
  //   const { id, email, password, role, username } = user;
  //   return { id, email, password, role, username };
  // }

  async findbyEmail(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });

    if (!user) return null;

    const { id, password, role, username } = user;
    return { id, email, password, role, username };
  }
}
