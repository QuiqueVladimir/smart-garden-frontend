import { Component } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {FooterContentComponent} from "../footer-content/footer-content.component";
import {UserService} from "../../../shared/services/user.service";
import {MatLabel} from "@angular/material/form-field";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-side-navigation-bar',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatListModule,
    RouterLink,
    MatIconModule,
    NgForOf,
    NgClass,
    MatButtonModule,
    ToolbarComponent,
    FooterContentComponent,
    MatLabel,
    FooterComponent
  ],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent {
  constructor(private userService: UserService) {}

  logout() :void{
    this.userService.logout();
  }

  menuItems = [
    {label: 'Home', icon: 'home', route: '/home'},
    {label: 'Explore', icon: 'explore', route: '/explore'},
    {label: 'My Collection', icon: 'collections', route: '/collection'},
    {label: 'Notifications', icon: 'notifications', route: '/notifications'},
    {label: 'Communities', icon: 'group', route: '/communities'},
    {label: 'My store', icon: 'store', route: '/store'},
    {label: 'Profile', icon: 'account_circle', route: '/profile'},
    {label: 'Subscriptions', icon: 'subscriptions', route: '/subscriptions'},
    {label: 'Settings', icon: 'settings', route: '/settings'}
  ]
}
