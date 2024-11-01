import {Component, OnInit} from '@angular/core';
import {SubscriptionCardComponent} from "../../components/subscription-card/subscription-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {Subscription} from "../../models/subscription-entity";
import {SubscriptionsUser} from "../../models/subscriptions-user";
import {SubscriptionsService} from "../../services/subscriptions.service";

@Component({
  selector: 'app-management-subscription-page',
  standalone: true,
  imports: [
    SubscriptionCardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './management-subscription-page.component.html',
  styleUrl: './management-subscription-page.component.css'
})
export class ManagementSubscriptionPageComponent implements OnInit{
  activeSubscription: SubscriptionsUser | null = null;

  constructor(private subscriptionService: SubscriptionsService) {}

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('user')||'{}');
    const userId = user.id;

    this.subscriptionService.getActiveSubscription(userId).subscribe(subscription =>{
      this.activeSubscription = subscription;
    })
  }

  subscriptions: Subscription[] = [
    {id: 1, title: 'Basic', target: 'Expert', duration: '1 mes', cost: 9.99, description: 'Create courses and share your knowledge with the world'},
    {id: 2, title: 'Community expansion', target: 'Expert', duration: '1 mes', cost: 14.99, description: 'Create courses and communities to share progress'},
    {id: 3, title: 'Pro Plan Expert', target: 'Expert', duration: '1 año', cost: 24.99, description: 'Acceso ilimtidao'},
    {id: 4, title: 'Learning Plan', target: 'Learner', duration: 'unlimited', cost: 0, description: 'Discover hydroponics at your own pace, you can access digital courses, communities and stores'},
  ];
}
