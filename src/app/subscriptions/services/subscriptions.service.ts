import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {SubscriptionsUser} from "../models/subscriptions-user";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService extends BaseService<SubscriptionsUser>{
  constructor() {
    super('/subscriptionsUsers');
  }
  getActiveSubscription(userId: number): Observable<SubscriptionsUser | null> {
    return this.http.get<any[]>(`${this.resourcePath()}?userId=${userId}&status=active`).pipe(
      map(subscriptions => {
        if (subscriptions.length > 0) {
          const subscription = subscriptions[0];
          return new SubscriptionsUser({
            id: subscription.id,
            userId: subscription.userId,
            subscriptionId: subscription.subscription_id,
            status: subscription.status,
            startDate: new Date(subscription.date_init),
            endDate: new Date(subscription.date_end)
          });
        }
        return null;
      })
    );
  }
}
