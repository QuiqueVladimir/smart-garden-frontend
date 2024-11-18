import { Component, Input } from '@angular/core';
import {CommunityService} from "../../services/community/community.service";
import {Community} from "../../models/community-entity";
import {NgIf, SlicePipe} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {CommunityEditDialogComponent} from "../community-edit-dialog/community-edit-dialog.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-community-card',
  standalone: true,
  imports: [
    SlicePipe,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    CommunityEditDialogComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './community-card.component.html',
  styleUrl: './community-card.component.css'
})
export class CommunityCardComponent {
  @Input() community!: Community;
  userId: number;

  constructor(private communityService: CommunityService, private dialog: MatDialog){
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id || null;
  }

  viewCommunity(): void{

  }

  editCommunity(): void{
    if(this.userId === this.community.expertId){
      this.dialog.open(CommunityEditDialogComponent, {
        data: { community: this.community}
      });
    }
  }

}
