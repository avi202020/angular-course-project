import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../core/store/app.state';
import { PostModel } from '../../../core/models/posts/post.model';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { PostsService } from '../../../core/services/posts/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent extends BaseComponent implements OnInit {
  protected postId: string;
  protected post: PostModel;
  private subscription$: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute,
    protected authService: AuthService, private postService: PostsService) {
    super();
   }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.subscription$ = this.store
      .pipe(select(store => store.posts.all))
      .subscribe(posts => {
        if (posts.length > 0) {
          this.post = posts.find(p => p._id === this.postId);
        }
      });
      this.subscriptions.push(this.subscription$);
  }

  sameAuthor(): boolean {
    return this.authService.userName === this.post.authorName;
  }

  delete(): void {
    this.postService.deletePost(this.post._id);
  }
}
