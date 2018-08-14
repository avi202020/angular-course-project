import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './components/auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  exports: [
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
