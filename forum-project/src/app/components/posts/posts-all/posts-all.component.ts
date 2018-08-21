import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../../core/models/posts/post.model';
import { PostsService } from '../../../core/services/posts/posts.service';
import { BaseComponent } from '../../base.component';
import { Subscription } from 'rxjs';
import { AppState } from '../../../core/store/app.state';
import { Store, select } from '@ngrx/store';
import { PostAllModel } from '../../../core/models/posts/postAll.model';
import { Router } from '@angular/router';
import { CategoryEditModel } from '../../../core/models/category/categoryEdit.model';

@Component({
  selector: 'app-posts-all',
  templateUrl: './posts-all.component.html',
  styleUrls: ['./posts-all.component.scss']
})
export class PostsAllComponent extends BaseComponent implements OnInit {
  protected posts: Array<PostAllModel>;
  postSubscription$: Subscription;
  protected pageSize = 6;
  protected currentPage = 1;

  constructor(protected postsService: PostsService, private store: Store<AppState>, private router: Router) {
    super();
   }

  ngOnInit() {
    this.posts = [];
    this.postsService.getAllPosts();
    this.postSubscription$ = this.store
      .pipe(select(state => state.posts.all))
      .subscribe(posts => {
        if (posts.length > 0) {
          this.posts = [];
          const postsS = posts
            .sort((a: PostModel, b: PostModel) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
            .slice(0, 12);
          console.log(postsS);
          for (const i of postsS) {
            const obj = new PostAllModel(i._id, i.title, i.body, i.authorName, i.category, new Date(i.creationDate));
            this.posts.push(obj);
          }
        }
      });
      this.subscriptions.push(this.postSubscription$);
  }

  changePage (page) {
    this.currentPage = page;
  }

  navigate(id: string) {
    this.router.navigate([`/posts/details/${id}`]);
  }
}
