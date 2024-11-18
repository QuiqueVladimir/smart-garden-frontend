import {Component, Input, OnInit, ViewChild} from '@angular/core';

import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { PurchasedCoursesService } from '../../../smartGarden/services/purchased/purchased-courses.service';
import {CourseService} from "../../../smartGarden/services/course/course.service";


@Component({
  selector: 'app-my-purchased',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatPaginator,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    DatePipe
  ],
  templateUrl: './my-purchased.component.html',
  styleUrl: './my-purchased.component.css'
})
export class MyPurchasedComponent implements OnInit{
  @Input() userId: number = 0;
  displayedColumns: string[] = ['courseTitle', 'courseId', 'amount', 'cardNumberMasked', 'date'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private purchaseService: PurchasedCoursesService,
              private courseService: CourseService) {}

  ngOnInit() {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.purchaseService.getPurchasedCoursesByUserId(this.userId).subscribe(purchases => {
      const courseIds = purchases.map(purchase => purchase.courseId);
      this.courseService.getCoursesByIds(courseIds).subscribe(courses => {
        const purchaseData = purchases.map(purchase => {
          const course = courses.find(course => course.id === purchase.courseId);
          return {
            courseTitle: course?.title || 'Unknown',
            courseId: purchase.courseId,
            amount: purchase.amount,
            cardNumberMasked: purchase.cardNumberMasked,
            date: purchase.purchaseDate
          };
        });
        this.dataSource.data = purchaseData;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
