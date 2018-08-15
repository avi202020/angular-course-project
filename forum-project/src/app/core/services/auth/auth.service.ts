import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/auth/register.model';
import { LoginModel } from '../../models/auth/login.model';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';

const loginUrl = 'http://localhost:5000/auth/login';
const registerUrl = 'http://localhost:5000/auth/signup';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<AppState>) {

  }

  register(body: RegisterModel) {
    return this.http.post(registerUrl, body);
  }

  login(body: LoginModel) {
    return this.http.post(loginUrl, body);
  }

  logout() {
    localStorage.clear();
    this.toastr.success('Logout successful!');
    this.router.navigate(['/signin']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  isAdmin() {
    if (this.user) {
      return this.user.isAdmin;
    }
    return false;
  }

  get user() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return currentUser;
  }
}
