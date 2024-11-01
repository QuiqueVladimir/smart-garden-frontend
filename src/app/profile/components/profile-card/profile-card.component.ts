import {Component, OnInit} from '@angular/core';
import {User, UserService} from "../../../shared/services/user.service";
import {NgIf, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgIf
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent implements OnInit{
  user: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const loggedUserId = 1; // Aquí puedes obtener el ID del usuario logueado
    this.userService.getUserById(loggedUserId).subscribe((data) => {
      this.user = data;
    });
  }
}

