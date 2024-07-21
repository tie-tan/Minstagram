export class Post {
  constructor(
    public title: string,
    public description: string,
    public imagePath: string,
    public numberOfLikes: number,
    public author: string,
    public datetimeCreated: Date

  ) {}
}
