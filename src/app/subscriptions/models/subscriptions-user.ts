export class SubscriptionsUser {
  id: number;
  userId: number;
  subscriptionId: number;
  status: string;
  startDate: Date;
  endDate: Date;
  constructor(subscriptionUser:{
    id: number,
    userId: number,
    subscriptionId: number,
    status: string,
    startDate: Date,
    endDate: Date }) {
    this.id = subscriptionUser.id;
    this.userId = subscriptionUser.userId;
    this.subscriptionId = subscriptionUser.subscriptionId;
    this.status = subscriptionUser.status;
    this.startDate = subscriptionUser.startDate;
    this.endDate = subscriptionUser.endDate
  }
}
