import { Component, OnInit } from '@angular/core';
import { PostsService } from './core/services/posts/posts.service';
import { CategoriesService } from './core/services/categories/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private postService: PostsService,
    private categoryService: CategoriesService) {

  }

  ngOnInit(): void {
    this.postService.getAllPosts();
    this.categoryService.getAllCategories();
  }
}
