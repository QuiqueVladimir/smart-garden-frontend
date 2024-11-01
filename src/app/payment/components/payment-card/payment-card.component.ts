import { Component } from '@angular/core';
import {Card} from "../../models/card-entity";
import {PaymentCardService} from "../../services/payment-card.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css'
})
export class PaymentCardComponent {
  card: Card = new Card();

  constructor(private paymentService: PaymentCardService) {}

  onSubmit(): void {
    this.paymentService.addCard(this.card).subscribe(
      response => {
        console.log('Payment successful:', response);
        alert('Payment was successful!');
      },
      error => {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
      }
    );
  }

  onCancel(): void {
    this.card = new Card();
  }
}
