import { Injectable } from '@angular/core';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Abhishek',
      email: 'Abhishek@example.com',
      phone: '1234567890',
      address: 'Dehradun',
    },
    {
      id: 2,
      name: 'Abhi',
      email: 'abhi@example.com',
      phone: '9876543210',
      address: 'Himachal',
    },
  ];

  constructor() {}

  getCustomers(): Customer[] {
    console.log(this.customers);
    return this.customers;
  }

  getCustomer(id: number): Customer {
    console.log(id);
    // @ts-ignore
    return this.customers.find((customer) => customer.id === id);
  }

  addCustomer(customer: Customer): Customer {
    const newCustomerId = this.customers.length + 1;
    customer.id = newCustomerId;
    this.customers.push(customer);
    return customer;
  }

  updateCustomer(id: number, customer: Customer): Customer {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.customers[index] = customer;
    }
    return customer;
  }

  deleteCustomer(id: number): void {
    const index = this.customers.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.customers.splice(index, 1);
    }
  }
}
