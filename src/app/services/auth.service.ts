import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any;

  constructor(private router: Router) {}

  login(username: string, password: string, role: string): void {
    this.currentUser = {
      username: username,
      role: role,
      password: password,
    };
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser && currentUser.role === 'Admin';
  }
}
