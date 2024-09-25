import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {FooterContentComponent} from "../footer-content/footer-content.component";

@Component({
  selector: 'app-side-navigation-bar',
  standalone: true,
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    MatList,
    MatListItem,
    RouterLink,
    MatIcon,
    NgForOf,
    NgClass,
    MatButton,
    ToolbarComponent,
    FooterContentComponent
  ],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent {
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
