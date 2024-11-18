export class Banned {
  id: number;
  userId: number;
  communityId: number;
  note: string;
  bannedDate: Date;
  constructor(banned: {
    id: number,
    userId: number,
    communityId: number,
    note: string,
    bannedDate: Date
  }) {
    this.id = banned.id;
    this.userId = banned.userId;
    this.communityId = banned.communityId;
    this.note = banned.note;
    this.bannedDate = banned.bannedDate;
  }
}
