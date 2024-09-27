export class SubscriptionPlan {
  id: number;
  name: string;
  typeUser: string;
  price: number;
  description: string;
  duration: number;
  constructor(subscriptionPlan:{
    id: number,
    name: string,
    typeUser: string,
    price: number,
    description: string,
    duration: number
  }){
    this.id = subscriptionPlan.id;
    this.name = subscriptionPlan.name;
    this.price = subscriptionPlan.price;
    this.description = subscriptionPlan.description;
    this.duration = subscriptionPlan.duration;
    this.typeUser = subscriptionPlan.typeUser;
  }
}
