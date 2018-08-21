export class PostHomeModel {
  public _id: string;
  public title: string;
  public body: string;
  public creationDate: Date;

  constructor(id: string, title: string, body: string, creationDate: Date) {
    this._id = id;
    this.title = title;
    this.body = body;
    this.creationDate = creationDate;
  }
}
