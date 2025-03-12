import { AddressModel } from '../address/address.model';

export class UserModel {
  public id: string = '';
  public name: string = '';
  public cpf: string = '';
  public email: string = '';
  public phone: string = '';
  public createdAt: string = '';
  public address: AddressModel[] = [];
}
