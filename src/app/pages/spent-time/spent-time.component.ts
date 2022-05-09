import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDatepicker } from "@angular/material/datepicker";
import { SpentTimeService } from './spent-time.service';
export interface testCard {
  title: string;
  specs: number;
  implement: number;
  fixingSpecs: number;
  fixingImplement: number;
}

export interface testProject {
  title: string;
}

@Component({
  selector: 'app-spent-time',
  templateUrl: './spent-time.component.html',
  styleUrls: ['./spent-time.component.scss']
})
export class SpentTimeComponent implements OnInit {

  @ViewChild('datepickerFooter', { static: false })
  datepickerFooter!: ElementRef;
  @ViewChild('datepicker', { static: false })
  datepicker!: MatDatepicker<any>;

  selectedValue : Date | null = null;
  public results:any;// กำหนดตัวแปร เพื่อรับค่า
  testCards: testCard[]=[];

  sumSpecs !: number;
  sumImplement !: number;
  sumFixingSpecs !: number;
  sumFixingImplement !: number;
  check !:number;
  
  displayedColumns: string[] = ['title', 'specs', 'implement', 'fixingSpecs', 'fixingImplement'];
   
  constructor(private spentTimeService : SpentTimeService,) { }

  ngOnInit(): void {
    this.showTable();
  }
  
  showTable():void {
     this.check =1;
  }

  showDailyTable(): void {
    this.spentTimeService.getCard().subscribe((resp: any) => {this.testCards = resp.data
      // ดูโครงสร้างของ json ทั้งหมดผ่าน console
      // ดู status code ได้ค่า 200
     });    
     this.check = 1;
   
     var i!: number;
     for(i=0; i < this.testCards.length; i ++)
     {
       this.sumSpecs += this.testCards[i].specs;
       this.sumImplement += this.testCards[i].implement;
       this.sumFixingSpecs += this.testCards[i].fixingSpecs;
       this.sumFixingImplement += this.testCards[i].fixingImplement;
     }

    this.selectedValue = new Date();
    this.datepicker.close();
    
    /*console.log(this.results.data[0].project.displayText);
    console.log(this.results.data[0].title);*/
  }

  showWeeklyTable(): void {
    this.check = 2;
  }
  
  showProjectTable(): void {

  }

}