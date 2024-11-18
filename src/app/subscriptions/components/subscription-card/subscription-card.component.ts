import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {Subscription} from "../../models/subscription-entity";
import {NgIf} from "@angular/common";
import {SubscriptionsUser} from "../../models/subscriptions-user";

@Component({
  selector: 'app-subscription-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './subscription-card.component.html',
  styleUrl: './subscription-card.component.css'
})
export class SubscriptionCardComponent implements OnInit{
  @Input() subscription!: Subscription;
  @Input() activeSubscription: SubscriptionsUser | null = null;
  hasSubscription: boolean = false;
  currentSubscriptionId: number | null = null;

  ngOnInit() {
    if(this.activeSubscription){
      const currentDate = new Date();
      const subscriptionEndDate = this.activeSubscription.endDate;
      this.hasSubscription = subscriptionEndDate > currentDate;
      this.currentSubscriptionId = this.activeSubscription.subscriptionId
    }
  }
  manageSubscription(){
  }
  buySubscription(){

  }

}
