export class PostHomeModel {
  public _id: string;
  public title: string;
  public body: string;
  public creationDate: string;

  constructor(id: string, title: string, body: string, creationDate: string) {
    this._id = id;
    this.title = title;
    this.body = body;
    this.creationDate = creationDate;
  }
}
