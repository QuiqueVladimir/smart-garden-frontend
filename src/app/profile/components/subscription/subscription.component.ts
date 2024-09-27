import { Component, OnInit } from '@angular/core';
import { SubscriptionService} from "../../services/subscription-service.service";
import {SubscriptionPlan} from "../../models/subscription-entity";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CurrencyPipe,
    MatCardActions,
    MatCardContent,
    MatCard,
    MatCardTitle,
    MatCardHeader
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit {
  subscriptions: SubscriptionPlan[] = [];

  constructor(private subscriptionService: SubscriptionService) {
  }

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getAll().subscribe((subscriptions: SubscriptionPlan[]) => {
      this.subscriptions = subscriptions;
    });
  }
}
