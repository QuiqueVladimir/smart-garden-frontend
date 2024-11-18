export class PaymentMethod {
  id: number;
  userId: number;
  cardHolder: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  constructor(paymentMethod: {
    id: number,
    userId: number,
    cardHolder: string,
    cardNumber: string,
    expirationDate: string,
    cvv: string
  }) {
    this.id = paymentMethod.id;
    this.userId = paymentMethod.userId;
    this.cardHolder = paymentMethod.cardHolder;
    this.cardNumber = paymentMethod.cardNumber;
    this.expirationDate = paymentMethod.expirationDate;
    this.cvv = paymentMethod.cvv;
  }
}
