import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.auth.currentUser;
    if (!currentUser || currentUser.role !== 'admin') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
