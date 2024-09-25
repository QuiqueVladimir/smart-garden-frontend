export class Course {
  id: number;
  title: string;
  description: string;
  image: string;
  expertId: number;
  communityId: number;
  price: number;
  rating: number;
  numberModules: number;
  constructor(course:{
    id: number,
    title: string,
    description: string,
    image?: string,
    expertId: number,
    communityId?: number,
    price?: number,
    rating?: number,
    numberModules?: number}){
    this.id = course.id;
    this.title = course.title;
    this.description = course.description;
    this.image = course.image || 'https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg';
    this.expertId = course.expertId || 0;
    this.communityId = course.communityId || 0;
    this.price = course.price || 0;
    this.rating = course.rating || 0;
    this.numberModules = course.numberModules || 0;
  }
}
