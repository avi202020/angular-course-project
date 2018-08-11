import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sharedComponents } from './index';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [
    ...sharedComponents,
  ],
  exports: [
    ...sharedComponents,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class SharedModule {

}
