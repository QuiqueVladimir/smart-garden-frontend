import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {CourseService} from "../../../smartGarden/services/course/course.service";
import {PurchasedCoursesService} from "../../../smartGarden/services/purchased/purchased-courses.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-my-earnings',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    DatePipe
  ],
  templateUrl: './my-earnings.component.html',
  styleUrl: './my-earnings.component.css'
})
export class MyEarningsComponent implements OnInit{
  @Input() userId: number = 0;
  displayedColumns: string[] = ['courseTitle', 'courseId', 'buyer', 'amount', 'serviceCost', 'cardNumberMasked', 'date', 'netPayment'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private courseService: CourseService, private purchaseService: PurchasedCoursesService) {}

  ngOnInit() {
    this.loadEarnings();
  }

  loadEarnings(): void {
    this.courseService.getCoursePublishedByExpertId(this.userId).subscribe(courses => {
      const courseIds = courses.map(course => course.id);
      this.purchaseService.getPurchasesByCourseIds(courseIds).subscribe(purchases => {
        const earnings = purchases
          .filter(purchase => courseIds.includes(purchase.courseId))
          .map(purchase => {
            const course = courses.find(course => course.id === purchase.courseId);
            const serviceCost = purchase.amount * 0.1;
            return {
              courseTitle: course?.title || 'Unknown',
              courseId: course?.id || 0,
              buyer: purchase.userId,
              amount: purchase.amount,
              serviceCost: serviceCost,
              cardNumberMasked: purchase.cardNumberMasked,
              date: purchase.purchaseDate,
              netPayment: purchase.amount - serviceCost
            };
          });
        this.dataSource.data = earnings;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
