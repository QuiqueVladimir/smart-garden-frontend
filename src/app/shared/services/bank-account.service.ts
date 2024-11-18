import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {BankAccountEntity} from "../models/bank-account/bank-account-entity";
import {catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService extends BaseService<BankAccountEntity> {
  constructor() {
    super('/bankAccounts');
  }

  addBankAccount(bankAccount: BankAccountEntity) {
    return this.create(bankAccount);
  }

  getBanksAccountsByUserId(userId: number) {
    return this.http.get<BankAccountEntity[]>(`${this.resourcePath()}?userId=${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getBankAccountById(bankAccountId: number) {
    return this.http.get<BankAccountEntity>(`${this.resourcePath()}?bankAccountId=${bankAccountId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteBankAccount(bankAccountId: number) {
    return this.http.delete(`${this.resourcePath()}/${bankAccountId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
