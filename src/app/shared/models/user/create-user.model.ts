import { AddressModel } from '../address/address.model';

export class CreateUserModel {
  public name: string = '';
  public cpf: string = '';
  public email: string = '';
  public phone: string = '';
  public address?: AddressModel | null;
}
