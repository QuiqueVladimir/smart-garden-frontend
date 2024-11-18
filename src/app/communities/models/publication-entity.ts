export class Publication {
  id: number;
  userId: number;
  communityId: number;
  content: string;
  imageUrl?: string;
  date: Date;
  isPinned: boolean;
  numberLikes: number;
  numberComments: number;

  constructor(publication: {
    id: number,
    userId: number,
    communityId: number,
    content: string,
    imageUrl?: string,
    date: Date,
    isPinned: boolean
    numberLikes: 0,
    numberComments: 0
  }) {
    this.id = publication.id;
    this.userId = publication.userId;
    this.communityId = publication.communityId;
    this.content = publication.content;
    this.imageUrl = publication.imageUrl;
    this.date = publication.date;
    this.isPinned = publication.isPinned;
    this.numberLikes = publication.numberLikes;
    this.numberComments = publication.numberComments;
  }
}
