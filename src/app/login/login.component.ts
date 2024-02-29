import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/customers']);
    }
  }

  login(form: NgForm): void {
    if (form.valid) {
      if (form.value.role === 'Admin') {
        if (
          form.value.username.trim() === 'Abhishek' &&
          form.value.password.trim() === 'Abhishek'
        ) {
          this.authService.login(
            form.value.username,
            form.value.password,
            form.value.role
          );
          this.router.navigate(['/customers']);
        } else {
          alert('Please enter correct Admin Credentials');
        }
      } else {
        this.authService.login(
          form.value.username,
          form.value.password,
          form.value.role
        );
        this.router.navigate(['/customers']);
      }
    }
  }
}
