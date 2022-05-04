import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  symbolic: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'k', weight: 1.0079, symbol: 'H', symbolic: 'W' },

];

@Component({
  selector: 'app-spent-time',
  templateUrl: './spent-time.component.html',
  styleUrls: ['./spent-time.component.scss']
})
export class SpentTimeComponent {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbolic'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

  showDTable(): void {
    console.log("RuN");
  }
  showPTable(): void {
    console.log("project");
  }
  showWTable(): void {
    console.log("week");
  }

}

