export class Subscription {
  id: number;
  title: string;
  target: string;
  duration: string;
  cost: number;
  description: string;
  constructor(subscription:{
    id: number,
    title: string,
    target: string,
    duration: string,
    cost: number,
    description: string}){
    this.id = subscription.id;
    this.title = subscription.title;
    this.target = subscription.target;
    this.duration = subscription.duration;
    this.cost = subscription.cost;
    this.description = subscription.description
  }
}
