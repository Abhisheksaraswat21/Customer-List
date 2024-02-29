import { Component, OnInit } from '@angular/core';
import { Customer } from '../../services/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css',
})
export class CustomerEditComponent implements OnInit {
  customerId: number | null = null;
  // @ts-ignore
  customer: Customer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.customerId = +params['id'];
      this.loadCustomer();
    });
  }

  loadCustomer(): void {
    this.customer = this.customerService
      // @ts-ignore
      .getCustomer(this.customerId);

    console.log(this.customer);
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (
        this.customer.name?.length > 0 ||
        this.customer.email?.length > 0 ||
        this.customer.phone?.length > 0 ||
        this.customer.address?.length > 0
      ) {
        const updatedCustomer: Customer = {
          // @ts-ignore
          id: this.customerId,
          name: form.value.name,
          email: form.value.email,
          phone: form.value.phone,
          address: form.value.address,
        };

        this.customerService
          // @ts-ignore
          .updateCustomer(this.customerId, updatedCustomer);

        alert('Customer updated Successfully!');
        this.router.navigate(['/customers']);
      }
    } else {
      alert('Please fill in all the details before submitting');
    }
  }
}
