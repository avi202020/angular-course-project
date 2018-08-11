import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authComponents } from './index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ...authComponents
  ],
  declarations: [
    ...authComponents
  ]
})
export class AuthModule {

}
