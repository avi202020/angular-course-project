import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './components/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { GuardsModule } from './core/guards/guards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServicesModule } from './core/services/services.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

import { appReducers} from './core/store/app.reducers';
import { ErrorInterceptor } from './core/interceptors';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { HomeComponent } from './components/home/home.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    GuardsModule,
    HttpClientModule,
    ServicesModule,
    SharedModule,
    StoreModule.forRoot(appReducers),
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  exports: [
    CdkTableModule,
    CdkTreeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
