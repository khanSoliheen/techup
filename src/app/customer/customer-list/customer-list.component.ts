import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  customers: any[] = [];

  ngOnInit() {
    this.customers = JSON.parse(localStorage.getItem('customers') || '[]');
  }
}
