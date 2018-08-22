import { NgModule } from '@angular/core';
import { adminComponents } from '.';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRoutingModule } from './admin.routing';
import { AdminEditCategoryComponent } from './admin-edit-category/admin-edit-category.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';

@NgModule({
  declarations: [
    ...adminComponents
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
  ],
  entryComponents: [
    ...adminComponents
  ]
})
export class AdminModule { }
