export class CommentLike {
  id: number;
  userId: number;
  commentId: number;
  date: Date;

  constructor(commentLike: {
    id: number,
    userId: number,
    commentId: number,
    date: Date
  }){
    this.id = commentLike.id;
    this.userId = commentLike.userId;
    this.commentId = commentLike.commentId;
    this.date = commentLike.date;
  }
}
