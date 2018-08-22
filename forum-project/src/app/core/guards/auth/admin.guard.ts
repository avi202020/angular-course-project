import { Injectable } from '@angular/core';
import {
   CanActivate,
   ActivatedRouteSnapshot,
   RouterStateSnapshot,
   Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
