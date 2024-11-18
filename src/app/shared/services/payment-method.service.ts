import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {PaymentMethod} from "../models/payment-method/payment-method-entity";
import {catchError, Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService extends BaseService<PaymentMethod>{

  constructor() {
    super('/paymentMethods');
  }

  addPaymentMethod(paymentMethod: PaymentMethod): Observable<PaymentMethod> {
    return this.create(paymentMethod);
  }

  getPaymentMethodsByUserId(userId: number): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.resourcePath()}?userId=${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getPaymentMethodById(paymentMethodId: number): Observable<PaymentMethod> {
    return this.http.get<PaymentMethod>(`${this.resourcePath()}?paymentMethodId=${paymentMethodId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deletePaymentMethod(paymentMethodId: number): Observable<void> {
    return this.delete(paymentMethodId);
  }

}
