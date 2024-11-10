export class CommentE {
  id: number;
  userId: number;
  publicationId: number;
  content: string;
  imageUrl?: string;
  date: Date;
  parentCommentId: number | null;
  numberLikes: number;
  numberResponses: number;

  constructor(comment: {
    id: number,
    userId: number,
    publicationId: number,
    content: string,
    imageUrl?: string,
    date: Date,
    parentCommentId: number | null
    numberLikes: 0,
    numberResponses: 0
  }) {
    this.id = comment.id;
    this.userId = comment.userId;
    this.publicationId = comment.publicationId;
    this.content = comment.content;
    this.imageUrl = comment.imageUrl;
    this.date = comment.date;
    this.parentCommentId = comment.parentCommentId;
    this.numberLikes = comment.numberLikes;
    this.numberResponses = comment.numberResponses;
  }
}
