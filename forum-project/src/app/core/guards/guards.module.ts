import { AuthGuard } from './auth/auth.guard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    AuthGuard
  ],
  imports: [
    CommonModule
  ]
})
export class GuardsModule {

}
