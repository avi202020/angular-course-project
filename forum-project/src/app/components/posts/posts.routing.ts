import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const furnitureRoutes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild(furnitureRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
