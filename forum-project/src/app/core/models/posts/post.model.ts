import { CommentModel } from '../comments/comment.model';

export class PostModel {
  public _id: string;
  public title: string;
  public body: string;
  public creationDate;
  public author: string;
  public category: string;
  public comments: CommentModel[];
}
