export class PublicationLike{
  id: number;
  userId: number;
  publicationId: number;
  date: Date;
  constructor(publicationLike:{
    id: number,
    userId: number,
    publicationId: number,
    date: Date
  }) {
    this.id = publicationLike.id;
    this.userId = publicationLike.userId;
    this.publicationId = publicationLike.publicationId;
    this.date = publicationLike.date;
  }
}
