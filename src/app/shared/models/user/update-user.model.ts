import { AddressModel } from '../address/address.model';

export class UpdateUserModel {
  public name?: string | null;
  public phone?: string | null;
  public address?: AddressModel | null;
}
