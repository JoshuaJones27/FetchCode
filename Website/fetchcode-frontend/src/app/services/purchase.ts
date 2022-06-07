export interface Checkout {
  fullName: string,
  email: string,
  address: string,
  city: string,
  state: string,
  postalCode: string,
  cardName: string,
  creditCardNumber: number,
  expirationMonth: string,
  expirationYear: string,
  cvv: number,
}
