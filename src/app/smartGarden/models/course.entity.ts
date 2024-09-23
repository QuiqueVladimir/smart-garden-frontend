export class Course {
  id: number;
  title: string;
  description: string;
  image: string;
  expertId: number;
  communityId: number;
  price: number;
  rating: number;
  constructor(course:{
    id: number,
    title: string,
    description: string,
    image?: string,
    expertId: number,
    communityId?: number,
    price?: number,
    rating?: number}){
    this.id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.image = course.image || '';
    this.expertId = course.expertId || 0;
    this.communityId = course.communityId || 0;
    this.price = course.price || 0;
    this.rating = course.rating || 0;
  }
}
