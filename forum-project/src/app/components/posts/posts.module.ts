import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { postsComponents } from '.';

@NgModule({
  declarations: [
    ...postsComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ...postsComponents
  ]
})
export class PostsModule { }
