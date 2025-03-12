import { Pipe, PipeTransform } from '@angular/core';
import { AddressModel } from '../models/address/address.model';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  public transform(value: AddressModel[], ...args: string[]): string {
    const data = value[0];
    if (data) {
      return `${data.street}, ${data.number}, ${data.city}, ${data.state} - ${data.postalCode}`;
    }

    return 'Sem endereço';
  }
}
