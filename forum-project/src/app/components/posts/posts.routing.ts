import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './post-details/post-details.component';

const postRoutes: Routes = [
  { path: 'details/:id', component: PostDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(postRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
