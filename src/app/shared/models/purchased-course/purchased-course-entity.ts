export class PurchasedCourse {
  id: number;
  userId: number;
  courseId: number;
  amount: number;
  purchaseDate: Date;
  cardNumberMasked: string;
  constructor(purchasedCourse: {
    id: number,
    userId: number,
    courseId: number,
    amount: number,
    purchaseDate: Date,
    cardNumberMasked: string
  }) {
    this.id = purchasedCourse.id;
    this.userId = purchasedCourse.userId;
    this.courseId = purchasedCourse.courseId;
    this.amount = purchasedCourse.amount;
    this.purchaseDate = purchasedCourse.purchaseDate;
    this.cardNumberMasked = purchasedCourse.cardNumberMasked;
  }
}
