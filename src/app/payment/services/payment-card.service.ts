import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Card} from "../models/card-entity";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentCardService extends BaseService<Card>  {

  constructor(http: HttpClient) {
    super('/cards');
    this.http = http;
  }

  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.resourcePath(), card);
  }
}
