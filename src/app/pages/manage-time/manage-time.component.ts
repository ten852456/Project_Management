import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDatepicker } from "@angular/material/datepicker";
export interface PeriodicElement {
  name: string;
  specs: number;
  implement: number;
  fixingSpecs: number;
  fixingImplement: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'testcard1', specs: 0,  implement: 0,  fixingSpecs: 0,fixingImplement: 0 },
  { name: 'testcard2', specs: 0,  implement: 0,  fixingSpecs: 0, fixingImplement: 0 },
];

@Component({
  selector: 'app-manage-time',
  templateUrl: './manage-time.component.html',
  styleUrls: ['./manage-time.component.scss']
})
export class ManageTimeComponent implements OnInit {

  @ViewChild('datepickerFooter', { static: false })
  datepickerFooter!: ElementRef;
  @ViewChild('datepicker', { static: false })
  datepicker!: MatDatepicker<any>;

  displayedColumns: string[] = ['name', 'specs','implement', 'fixingSpecs', 'fixingImplement'];
  dataSource = ELEMENT_DATA;

  searchText: any;

  constructor() { }

  selectedValue : Date | null = null;

  ngOnInit(): void {
  }

  showDTable(): void {
    console.log("RuN");
    this.selectedValue = new Date();
    this.datepicker.close();
  }

  showPTable(): void {
    console.log("project");
  }

  showWTable(): void {
    console.log("week");
  }

  today() {
    this.selectedValue = new Date();
  }

}


