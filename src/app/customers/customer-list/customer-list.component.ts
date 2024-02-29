import { Component, OnInit } from '@angular/core';
import { Customer } from '../../services/customer.model';
import { CustomerService } from '../../services/customer-service.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.isAdmin = this.authService.isAdmin();
  }

  loadCustomers(): void {
    this.customers = this.customerService.getCustomers();
  }

  deleteCustomer(id: number | undefined): void {
    if (this.authService.getCurrentUser()?.role === 'Admin') {
      if (confirm('Are you sure you want to delete this customer?')) {
        // @ts-ignore
        this.customerService.deleteCustomer(id);
      }
    } else {
      alert('Please login as admin to perform delete operation!');
    }
  }
  editCustomer(id: number | undefined): void {
    this.router.navigate(['/customers/edit', id]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
