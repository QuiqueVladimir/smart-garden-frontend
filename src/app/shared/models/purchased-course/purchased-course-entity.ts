export class PurchasedCourse {
  id: number;
  userId: number;
  courseId: number;
  communityAccess: string;
  purchaseDate: Date;

  constructor(purchasedCourse: {
    id: number,
    userId: number,
    courseId: number,
    communityAccess: string,
    purchaseDate: Date
  }) {
    this.id = purchasedCourse.id;
    this.userId = purchasedCourse.userId;
    this.courseId = purchasedCourse.courseId;
    this.communityAccess = purchasedCourse.communityAccess;
    this.purchaseDate = purchasedCourse.purchaseDate;
  }
}
