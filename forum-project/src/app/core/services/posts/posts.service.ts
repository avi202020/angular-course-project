import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppState } from '../../store/app.state';
import { Store, select } from '@ngrx/store';
import { GetAllPosts, Add, Edit, Delete } from '../../store/posts/post.actions';
import { PostModel } from '../../models/posts/post.model';
import { ResponseModel } from '../../models/response.model';

const allPostsUrl = 'http://localhost:5000/post/all';
const createPostUrl = 'http://localhost:5000/post/create';
const editPostUrl = 'http://localhost:5000/post/edit/';
const deletePostUrl = 'http://localhost:5000/post/delete/';

@Injectable()
export class PostsService {
  private isAuthenticate: boolean;
  private isUserAdmin: boolean;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<AppState>) {
  }

  getAllPosts() {
    this.http.get<PostModel[]>(allPostsUrl)
      .subscribe(posts => {
        this.store.dispatch(new GetAllPosts(posts));
      });
  }

  addPost(model) {
    this.http.post(createPostUrl, model)
      .subscribe((newCat: ResponseModel) => {
        this.store.dispatch(new Add(newCat.data));
        this.toastr.success(newCat.message);
        this.router.navigate(['/posts']);
    });
  }

  editPost(id: string, model: PostModel) {
    this.http.post(editPostUrl + id, model)
      .subscribe((editCat: ResponseModel) => {
        this.store.dispatch(new Edit(editCat.data));
        this.toastr.info(editCat.message);
        this.router.navigate([`/posts/details/${id}`]);
      });
  }

  deletePost(id: string) {
    this.http.delete(deletePostUrl + id)
      .subscribe((res: ResponseModel) => {
        this.store.dispatch(new Delete(id));
        this.toastr.success(res.message);
        this.router.navigate(['/posts']);
    });
  }
}
