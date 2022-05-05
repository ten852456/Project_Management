import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  specs: number;
  implement: number;
  fixingSpecs: number;
  fixingImplement: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'testcard1', specs: 0, implement: 0, fixingSpecs: 0, fixingImplement: 0 },
  { name: 'testcard1', specs: 0, implement: 0, fixingSpecs: 0, fixingImplement: 0 },

];

@Component({
  selector: 'app-spent-time',
  templateUrl: './spent-time.component.html',
  styleUrls: ['./spent-time.component.scss']
})
export class SpentTimeComponent {

  displayedColumns: string[] = ['name', 'specs', 'implement', 'fixingSpecs', 'fixingImplement'];
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

