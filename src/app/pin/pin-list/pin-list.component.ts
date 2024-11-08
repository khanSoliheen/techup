import { Component } from '@angular/core';

@Component({
  selector: 'app-pin-list',
  standalone: true,
  imports: [],
  templateUrl: './pin-list.component.html',
  styleUrl: './pin-list.component.scss'
})
export class PinListComponent {
  // pins = JSON.parse(localStorage.getItem('pins') || '[]');
  pins: any[] = [];


  ngOnInit() {
    this.loadPins();
  }

  loadPins() {
    this.pins = JSON.parse(localStorage.getItem('pins') || '[]');
  }
}
