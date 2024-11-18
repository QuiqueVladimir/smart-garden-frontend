import { Component } from '@angular/core';
import {CollectionCourseListComponent} from "../../components/collection-course-list/collection-course-list.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-collection-page',
  standalone: true,
  imports: [
    CollectionCourseListComponent,
    MatToolbar,
    MatDivider,
    MatButton,
    NgIf
  ],
  templateUrl: './my-collection-page.component.html',
  styleUrl: './my-collection-page.component.css'
})
export class MyCollectionPageComponent {
  userType: string;

  constructor(private router: Router) {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userType = user.type || null;
  }
  isExpert(): boolean {
    if(this.userType==='expert') return true;
    else return false;
  }

  goCreatePage(){
    this.router.navigate(['/course/create']);
  }
}
