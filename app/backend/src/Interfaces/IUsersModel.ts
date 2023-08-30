import { ICRUDModelCreator, ICRUDModelReader } from './ICRUDModel';
import IUsers from './IUsers';

export default interface IUserModel extends ICRUDModelReader<IUsers>, ICRUDModelCreator<IUsers>{
  findbyEmail(email: IUsers['email']): Promise<IUsers | null>
}
