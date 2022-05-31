import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { __values } from 'tslib';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker, MatDateRangePicker, MAT_DATE_RANGE_SELECTION_STRATEGY ,MatDatepickerInputEvent} from "@angular/material/datepicker";
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute,  Router } from '@angular/router';


export interface MemberList {
  userId: number;
  id: number;
  displayText: string;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  sumHours: number;
  sum:number;
}

export interface Project {
  id: number;
  displayText: string;
  memberList: MemberList[];
  memberSorted: MemberList[];
  sumHours: number;
  sumSpecs: number;
  sumImplement: number;
  sumFixingSpecs: number;
  sumFixingImplement: number;
  sum:number;

}
export interface Card {
  id: number;
  displayText: string;
}

export interface DailyCardSpentTime {
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
  selector: 'app-manage-time',
  templateUrl: './manage-time.component.html',
  styleUrls: ['./manage-time.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: ManageTimeComponent,
    },
  ],
})

export class ManageTimeComponent<D> implements AfterViewInit {

  @ViewChild('datepickerFooter', { static: false })
  datepickerFooter!: ElementRef;
  @ViewChild('datepicker', { static: false })
  datepicker!: MatDatepicker<any>;
  @ViewChild('picker', { static: false })
  picker!: MatDateRangePicker<any>;

  displayedColumns: string[] = ['name', 'specs', 'implement', 'fixingSpecs', 'fixingImplement', 'sumOfEachMember'];
  pipe = new DatePipe('en-US');
  selectedValue :any;


  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  searchText: any;
  projects: Project[] = [];
  dailyCards: DailyCardSpentTime[] = [];
  queryMember = '?__template=project.member&completed=false';
  state: any;
  showDailyTable: boolean =true;
  showWeeklyTable: boolean =false;
  showProjectTable: boolean =false;

  constructor(
    private api: ApiServiceService,
    private _dateAdapter: DateAdapter<D>,
    private route: ActivatedRoute,
    private router:Router,
  ) {
    // this.router.navigate(['manage-time'],{relativeTo: this.route})
  }

  check !: number;
  selectedDate: any;



  ngAfterViewInit() {
    this.dailyTable();
  }

 addEvent(event: MatDatepickerInputEvent<Date>){
    this.selectedDate = this.pipe.transform(event.value, 'yyyy-MM-dd');

  }

 async showTable(): Promise<any>{
    console.log(this.selectedDate);
    this.api.getProject(this.queryMember).subscribe((resp: any) => { this.projects = resp.data, this.mapProjects() });
    this.api.getDailyCardSpentTime('?spentDate='+this.selectedDate).subscribe((resp: any) => { this.dailyCards = resp.data});


  }
 async dailyTable(): Promise<any>{
    this.state = "daily";
    sessionStorage.setItem("tableState",this.state);
    this.getDailyTable();
    this.showDailyTable = true;
    this.showWeeklyTable = false;
    this.showProjectTable = false;

  }
  async weeklyTable(): Promise<any> {
    this.state = "weekly";
    sessionStorage.setItem("tableState",this.state);
    this.getWeeklyTable();
    this.showDailyTable = false;
    this.showWeeklyTable = true;
    this.showProjectTable = false;

  }
  async projectTable(): Promise<any> {
    this.state = "project";
    sessionStorage.setItem("tableState",this.state);
    this.getProjectTable();
    this.showDailyTable = false;
    this.showWeeklyTable = false;
    this.showProjectTable = true;

  }
  private get today(): D {
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

  private _createWeeklyRange(date: D): [start: D, end: D] {
    const datestart = this._dateAdapter.getFirstDayOfWeek() - this._dateAdapter.getDayOfWeek(date);
    const start = this._dateAdapter.addCalendarDays(date, datestart);
    const end = this._dateAdapter.addCalendarDays(start, 6);
    return [start, end];
  }

  mapProjects(): void {
    this.projects.forEach((__values) =>
      __values.memberList.forEach((__values) => {
        if (__values.s1 || __values.s2 || __values.s3 || __values.s4 === undefined) {
          __values.s1 = 0;
          __values.s2 = 0;
          __values.s3 = 0;
          __values.s4 = 0;
          __values.sumHours = 0;
          __values.sum =0;
        }
      }
      )
    );
    this.projects.forEach((p) => {
      this.dailyCards.forEach((d)=> {
      if(d.project.id == p.id)
      {p.memberList.forEach((__member) =>
        this.dailyCards.forEach((__values) => {
          if (__values.user.id == __member.userId) {
            __member.s1 = __values.s1Hours;
            __member.s2 = __values.s2Hours;
            __member.s3 = __values.s3Hours;
            __member.s4 = __values.s4Hours;
            __member.sumHours = __values.sumHours;
            __member.sum = __member.s1 + __member.s2 + __member.s3 + __member.s4;

          }
        })
        )}})
    });
    this.projects.forEach((__values) => {
      __values.sumSpecs = 0;
      __values.sumImplement = 0;
      __values.sumFixingSpecs = 0;
      __values.sumFixingImplement = 0;
      __values.sumHours = 0;
      __values.sum = 0;
      __values.memberList.forEach((__member) => {

        __values.sumSpecs += __member.s1;
        __values.sumImplement += __member.s2;
        __values.sumFixingSpecs += __member.s3;
        __values.sumFixingImplement += __member.s4;
        __values.sumHours += __member.sumHours;
        __values.sum += __member.sum;
      }
      )
    });
    this.projects.forEach((p) => {
      p.memberList.sort(function (a, b) {
        var x = a.displayText.toLowerCase();
        var y = b.displayText.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      })
    });
    for (let i = 0; i < this.projects.length; i++) {
      this.projects[i].memberSorted = this.projects[i].memberList.map(value => { return value });
    }
  }

  async getDailyTable(): Promise<any>{

    this.selectedValue = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.api.getProject(this.queryMember).subscribe((resp: any) => { this.projects = resp.data, this.mapProjects() });
    this.api.getDailyCardSpentTime('?spentDate='+this.selectedValue).subscribe((resp: any) => { this.dailyCards = resp.data; });
    this.datepicker.close();
  }
  async getWeeklyTable(): Promise<any> {
    const date = this.today;
    let [start, end] = this.selectionFinished(date);
    this.picker.select(start);
    this.picker.select(end);
    this.picker.close();
    let startToString = String(start);
    let endToStringe = String(end);
    let startDate = this.pipe.transform(startToString, "yyyy-MM-dd");
    let endDate = this.pipe.transform(endToStringe, "yyyy-MM-dd");
    this.api.getProject(this.queryMember).subscribe((resp: any) => { this.projects = resp.data, this.mapProjects() });
    this.api.getDailyCardSpentTime('?spentDate_between='+startDate+'&spentDate_between='+endDate).subscribe((resp: any) => { this.dailyCards = resp.data });
  }
  async getProjectTable(): Promise<any> {
    this.api.getProject(this.queryMember).subscribe((resp: any) => { this.projects = resp.data, this.mapProjects() });
    this.api.getDailyCardSpentTime('').subscribe((resp: any) => { this.dailyCards = resp.data });
  }



}


