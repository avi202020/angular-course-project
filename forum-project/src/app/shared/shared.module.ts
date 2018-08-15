import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sharedComponents } from './index';
import { MatToolbarModule, MatButtonModule, MatFormFieldModule, MatDialogModule,
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatProgressBarModule,
  MatSnackBarModule } from '@angular/material';

const MAT_MODULES = [
  MatButtonModule,
  MatExpansionModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatDialogModule
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ...MAT_MODULES
  ],
  declarations: [
    ...sharedComponents,
  ],
  exports: [
    ...sharedComponents,
    ...MAT_MODULES
  ]
})
export class SharedModule {

}
