import { Component } from '@angular/core';
import {CommunityListComponent} from "../../components/community-list/community-list.component";

@Component({
  selector: 'app-communities-management-page',
  standalone: true,
  imports: [
    CommunityListComponent
  ],
  templateUrl: './communities-management-page.component.html',
  styleUrl: './communities-management-page.component.css'
})
export class CommunitiesManagementPageComponent {

}
