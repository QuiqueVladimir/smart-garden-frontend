import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SideNavigationBarComponent} from "./public/components/side-navigation-bar/side-navigation-bar.component";
import {NgIf} from "@angular/common";
import {UserService} from "./shared/services/user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideNavigationBarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'smart-garden-spa';
  constructor(private userService: UserService) {}

  isLoggedIn(): boolean{
    return this.userService.isLoggedIn();
  }
}
