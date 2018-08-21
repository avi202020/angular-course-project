import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { postsComponents } from '.';
import { PostsRoutingModule } from './posts.routing';
import { PostsListComponent } from './posts-list/posts-list.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostsCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';

@NgModule({
  declarations: [
    ...postsComponents,
    PostsListComponent,
    PostsCreateComponent,
    PostEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    SharedModule,
    NgxPaginationModule
  ],
  exports: [
    ...postsComponents
  ]
})
export class PostsModule { }
