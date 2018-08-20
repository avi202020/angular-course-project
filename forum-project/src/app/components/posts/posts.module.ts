import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { postsComponents } from '.';
import { PostsRoutingModule } from './posts.routing';
import { PostsListComponent } from './posts-list/posts-list.component';

@NgModule({
  declarations: [
    ...postsComponents,
    PostsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostsRoutingModule
  ],
  exports: [
    ...postsComponents
  ]
})
export class PostsModule { }
