import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker, MatDateRangePicker, MAT_DATE_RANGE_SELECTION_STRATEGY } from "@angular/material/datepicker";
import { DateAdapter } from '@angular/material/core';
import { Card, Project } from '../manage-time/manage-time.component';




export interface testCard {
  project: any;
  title: string;
  specs: number;
  implement: number;
  fixingSpecs: number;
  fixingImplement: number;
  id: number;
}

export interface testProject {
  id: number;
  title: string;
  test: testCard[];
}

export interface user {
  id: number;
  displayName: string;
  userName: string;
  roles: string[];
}
export interface dailyCard {
  spentDate: string;
  id: number;
  s1Hours: number;
  s2Hours: number;
  s3Hours: number;
  s4Hours: number;
  card: Card;
  project: Project;
  user: Card;
  sumHours: number;

}

@Component({
  selector: 'app-spent-time',
  templateUrl: './spent-time.component.html',
  styleUrls: ['./spent-time.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: SpentTimeComponent,
    },
  ],
})

export class SpentTimeComponent<D> {

  @ViewChild('datepickerFooter', { static: false })
  datepickerFooter!: ElementRef;
  @ViewChild('datepicker', { static: false })
  datepicker!: MatDatepicker<any>;
  @ViewChild('picker', { static: false })
  picker!: MatDateRangePicker<any>;

  selectedValue : Date | null = null;
  public results:any;// กำหนดตัวแปร เพื่อรับค่า
  testCards: testCard[]=[];
  users: user[] =[];
  testProjects: testProject[] = [];
  dailyCards: dailyCard[]= [];

  sumSpecs !: number;
  sumImplement !: number;
  sumFixingSpecs !: number;
  sumFixingImplement !: number;
  check !: number;

  displayedColumns: string[] = ['title', 'specs', 'implement', 'fixingSpecs', 'fixingImplement'];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  
  queryCard= '?__repotable=true&__user=userId';
  queryProject= '?__user=userId&active=true';

   
  constructor(
    private _dateAdapter: DateAdapter<D>,
    private api: ApiServiceService,

   
  ) { }

  private get today() : D {
    const date = this._dateAdapter.getValidDateOrNull(new Date());
    if (date === null) {
      throw new Error('date creation failed');
    }
    return date;
  }

  selectionFinished(date: D): [start: D, end: D] {
    return this._createWeeklyRange(date);
  }
  createPreview(activeDate: D): [start: D, end: D] {
    return this._createWeeklyRange(activeDate);
  }

  private _createWeeklyRange(date: D) : [start: D, end: D] {
      const datestart = this._dateAdapter.getFirstDayOfWeek() - this._dateAdapter.getDayOfWeek(date);
      const start = this._dateAdapter.addCalendarDays(date, datestart);
      const end = this._dateAdapter.addCalendarDays(start, 6);
      return [start, end];
  }

  ngOnInit(): void {
    this.showTable();
  }
  
  showTable():void {
     this.check =1;
     this.api.getCard(this.queryCard).subscribe((resp: any) => {
      this.testCards = resp.data,
      this.api.getProject(this.queryProject).subscribe((resp: any) => {
        this.testProjects = resp.data,
        this.mapTestProject()
      });

    });
  }

  mapTestProject(): void {

    for (var i = 0; i < this.testProjects.length; i++) {
      if (this.testProjects[i].test == undefined) {
        this.testProjects[i].test = [];
      }
     
    }
    for (var i = 0; i < this.testProjects.length; i++) {
      for (var j = 0; j < this.testCards.length; j++) {
        if (this.testCards[j].project.id == this.testProjects[i].id) {
          this.testProjects[i].test.push(this.testCards[j]);
        }
      }
    }

  }

  showDailyTable(): void {
    this.api.getCard(this.queryCard).subscribe((resp: any) => {this.testCards = resp.data
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
    
    const date = this.today;
    const [start, end] = this.selectionFinished(date);
    this.picker.select(start);
    this.picker.select(end);
    this.picker.close();
    this.api.getDailyCardSpentTime('?max='+ 99 + '&__template=dailyCardSpentTime.list&user=2&spentDate_between='+ [start,end]).subscribe((resp:any) => this.dailyCards = resp.data);
    
  }
  
  showProjectTable(): void {
    this.check = 3;
   
 

  }
  user(): void {
    this.api.getUser('?__template=user.list').subscribe((resp: any) => this.users = resp.data);
  }


}