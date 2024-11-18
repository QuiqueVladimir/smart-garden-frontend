import { Component, Input } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {Community} from "../../models/community-entity";

@Component({
  selector: 'app-about-community-card',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './about-community-card.component.html',
  styleUrl: './about-community-card.component.css'
})
export class AboutCommunityCardComponent {
@Input() community!: Community;
}
