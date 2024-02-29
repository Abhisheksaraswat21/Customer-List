import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer-service.service';
import { NgForm } from '@angular/forms';
import { Customer } from '../../services/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css',
})
export class CustomerAddComponent {
  customer: Customer = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  onSubmit(form: NgForm): void {
    console.log(form);
    if (form.valid) {
      const newCustomer: Customer = {
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        address: form.value.address,
      };

      this.customerService.addCustomer(newCustomer);

      this.router.navigate(['/customers']);
    }
  }
}
