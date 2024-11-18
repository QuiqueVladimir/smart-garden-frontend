import { Component } from '@angular/core';
import {SideNavigationBarComponent} from "../../components/side-navigation-bar/side-navigation-bar.component";

@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [
    SideNavigationBarComponent
  ],
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.css'
})
export class UserHomePageComponent {

}
