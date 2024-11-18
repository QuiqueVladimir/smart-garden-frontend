export class ImageModule {
  id: number;
  moduleId: number;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
  constructor(imageModule: {
    id: number,
    moduleId: number,
    title: string,
    imageUrl: string,
    description: string,
    createdAt: Date
  }) {
    this.id = imageModule.id;
    this.moduleId = imageModule.moduleId;
    this.title = imageModule.title;
    this.imageUrl = imageModule.imageUrl;
    this.description = imageModule.description;
    this.createdAt = imageModule.createdAt;
  }
}
