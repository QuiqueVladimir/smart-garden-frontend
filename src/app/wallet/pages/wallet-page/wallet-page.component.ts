import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MyEarningsComponent} from "../../components/my-earnings/my-earnings.component";
import {PurchaseComponent} from "../../../public/components/purchase/purchase.component";
import {MyPurchasedComponent} from "../../components/my-purchased/my-purchased.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-wallet-page',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    MyEarningsComponent,
    PurchaseComponent,
    MyPurchasedComponent,
    NgIf
  ],
  templateUrl: './wallet-page.component.html',
  styleUrl: './wallet-page.component.css'
})
export class WalletPageComponent {
  userId: number;
  userType: string;
  constructor() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id || null;
    this.userType = user.type || null;
  }
}
