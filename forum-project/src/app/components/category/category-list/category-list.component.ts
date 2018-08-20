import { Component, OnInit, Input } from '@angular/core';
import { CategoryEditModel } from '../../../core/models/category/categoryEdit.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  @Input() protected leftCatSet: CategoryEditModel[];
  @Input() protected rightCatSet: CategoryEditModel[];

  constructor() { }
}
