import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { AppState } from '../../core/store/app.state';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CategoryEditModel } from '../../core/models/category/categoryEdit.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {
  categories: CategoryEditModel[];
  leftCatSet;
  rightCatSet;
  subscription$: Subscription;
  constructor(private categoriesService: CategoriesService, private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.categoriesService.getAllCategories();
    this.subscription$ = this.store
      .pipe(select(state => state.categories.all))
      .subscribe(categories => {
        this.categories = categories.slice();
        this.categories.map(cat => {
          if (cat.name.length > 40) {
            cat.name = cat.name.substr(0, 40) + '...';
          }
          return cat;
        });
        this.leftCatSet =
            categories.splice(0, Math.ceil(categories.length / 2)); // gets the bigger half of the array
        if (this.leftCatSet.length > 5) {
            this.leftCatSet.splice(0, this.leftCatSet.length - 5);
        }
        if (this.categories.length > 5) {
          this.categories.splice(0, 4);
        }
        this.rightCatSet = categories;
      });
      this.subscriptions.push(this.subscription$);
  }
}
