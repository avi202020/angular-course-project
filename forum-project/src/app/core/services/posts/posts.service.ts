import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppState } from '../../store/app.state';
import { Store, select } from '@ngrx/store';

@Injectable()
export class PostsService {
  private isAuthenticate: boolean;
  private isUserAdmin: boolean;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<AppState>) {
  }
}
