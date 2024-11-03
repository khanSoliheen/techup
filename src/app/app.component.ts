import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerFormComponent } from "./customer/customer-form/customer-form.component";
import { PinFormComponent } from "./pin/pin-form/pin-form.component";
import { PinListComponent } from "./pin/pin-list/pin-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomerFormComponent, PinFormComponent, PinListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'techup-assignment';

  showCustomerModal = false;
  showPinModal = false;

  openCustomerModal() {
    this.showCustomerModal = true;
  }

  closeCustomerModal() {
    this.showCustomerModal = false;
  }

  openPinModal() {
    this.showPinModal = true;
  }

  closePinModal() {
    this.showPinModal = false;
  }
}
