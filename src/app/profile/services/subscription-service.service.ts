import { Injectable } from '@angular/core';
import {SubscriptionPlan} from "../models/subscription-entity";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService<SubscriptionPlan> {
  constructor() {
    super('/subscriptions');
  }

}
