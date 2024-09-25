import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatCardImage} from "@angular/material/card";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar-learners',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatAnchor,
    MatIconButton,
    MatCardImage,
    RouterLink
  ],
  templateUrl: './navbar-learners.component.html',
  styleUrl: './navbar-learners.component.css'
})
export class NavbarLearnersComponent {
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
