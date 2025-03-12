export class AddressModel {
  public street: string = '';
  public number: string = '';
  public city: string = '';
  public state: string = '';
  public country: string = '';
  public postalCode: string = '';
  public complement?: string | null = '';
  public neighborhood?: string | null = '';
}
