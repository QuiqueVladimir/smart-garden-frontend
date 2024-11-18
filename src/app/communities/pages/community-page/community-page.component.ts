import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AboutCommunityCardComponent} from "../../components/about-community-card/about-community-card.component";
import {Community} from "../../models/community-entity";
import {CommunityService} from "../../services/community/community.service";
import {NgIf, SlicePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {PublicationCardComponent} from "../../components/publication-card/publication-card.component";
import {PublicationsListComponent} from "../../components/publications-list/publications-list.component";
import {PublicationInputComponent} from "../../components/publication-input/publication-input.component";
import {MatDialog} from "@angular/material/dialog";
import {AccessDeniedDialogComponent} from "../../../public/components/access-denied-dialog/access-denied-dialog.component";
import {
  CommunityPurchasedCoursesService
} from "../../services/community-purchased-courses/community-purchased-courses.service";
import {CommunityEditDialogComponent} from "../../components/community-edit-dialog/community-edit-dialog.component";
import {BannedService} from "../../services/banned-management/banned.service";


@Component({
  selector: 'app-community-page',
  standalone: true,
  imports: [
    AboutCommunityCardComponent,
    SlicePipe,
    MatButtonModule,
    MatIconModule,
    PublicationCardComponent,
    PublicationsListComponent,
    PublicationInputComponent,
    NgIf
  ],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.css'
})
export class CommunityPageComponent implements OnInit {
  userId: number;
  community!: Community;

  constructor(private communityService: CommunityService,
              private communityPurchasedCoursesService: CommunityPurchasedCoursesService,
              private bannedService: BannedService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router
  ) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id || null;
  }

  ngOnInit():void {
    const communityId = this.route.snapshot.params['id'];
    this.communityService.getCommunityById(communityId).subscribe(
      (data: Community) => {
        if(data){
          this.community = data;
          this.checkAccess();
        } else {
          this.router.navigate(['/page-no-found'], {queryParams: {redirectUrl: '/communities'}});
        }
      },
      (error) => {
        console.error('Error fetching community data: ', error);
        this.router.navigate(['/page-no-found'], {queryParams: {redirectUrl: '/communities'}});
      }
    );
  }

  checkAccess(): void {
    if (this.userId) {
      if (this.isExpert()) {
        return;
      }
      this.bannedService.userIsBanned(this.userId, this.community.id).subscribe(
        (isBanned) => {
          if (isBanned) {
            this.showAccessDeniedDialog('You are banned from this community', '/communities');
          } else if (this.community.status === 'available') {
            this.communityPurchasedCoursesService.hasAccessToCommunity(this.userId, this.community.id).subscribe(
              (hasAccess) => {
                if (!hasAccess) {
                  this.showAccessDeniedDialog('You do not have access to this community because you have not purchased the associated course', '/communities');
                }
              },
              (error) => {
                console.error('Error checking access: ', error);
                this.showAccessDeniedDialog('You do not have access to this community', '/communities');
              }
            );
          } else{
            this.showAccessDeniedDialog('This community is not available', '/communities');
          }
        },
        (error) => {
          console.error('Error checking ban status: ', error);
          this.showAccessDeniedDialog('You do not have access to this community', '/communities');
        }
      );
    } else {
      this.showAccessDeniedDialog('You do not have access to this community', '/communities');
    }
  }

  showAccessDeniedDialog(message: string, redirectUrl: string): void{
    const dialogRef = this.dialog.open(AccessDeniedDialogComponent,{
      data: {message, redirectUrl}
    });
    setTimeout(() =>{
      dialogRef.close();
      this.router.navigate([redirectUrl]);
    }, 10000);
  }

  goBack(): void {
    this.router.navigate(['/communities']);
  }

  viewCourse(): void {
    this.router.navigate([`/course-content/${this.community.courseId}`]);
  }

  isExpert(): boolean {
    return this.community.expertId === this.userId;
  }

  editCommunity(): void {
    const dialogRef = this.dialog.open(CommunityEditDialogComponent, {
      data: { community: this.community }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.community = result;
      }
    });
  }

}
