import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sharedComponents } from './index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ...sharedComponents
  ],
  exports: [
    ...sharedComponents
  ]
})
export class SharedModule {

}
