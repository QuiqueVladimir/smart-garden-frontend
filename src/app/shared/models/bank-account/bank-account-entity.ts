export class BankAccountEntity {
  id: number;
  userId: number;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
  constructor(bankAccount: {
    id: number,
    userId: number,
    accountNumber: string,
    bankName: string,
    routingNumber: string
  }) {
    this.id = bankAccount.id;
    this.userId = bankAccount.userId;
    this.accountNumber = bankAccount.accountNumber;
    this.bankName = bankAccount.bankName;
    this.routingNumber = bankAccount.routingNumber;
  }
}
