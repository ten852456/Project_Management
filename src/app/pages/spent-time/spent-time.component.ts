import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatDatepicker, MatDateRangePicker, MAT_DATE_RANGE_SELECTION_STRATEGY } from "@angular/material/datepicker";
import { DateAdapter } from '@angular/material/core';
import { Card, Project } from '../manage-time/manage-time.component';
import { __values } from 'tslib';
import { DatePipe } from '@angular/common';




export interface ProjectSpentTime {
  id: number;
  title: string;
  dailyCards: DailyCard[];
}
export interface DailyCard {
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
  sumSpecs: number;
  sumImplement: number;
  sumFixingSpecs: number;
  sumFixingImplement: number;

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

export class SpentTimeComponent<D> implements OnInit {

  @ViewChild('datepickerFooter', { static: false })
  datepickerFooter!: ElementRef;
  @ViewChild('datepicker', { static: false })
  datepicker!: MatDatepicker<any>;
  @ViewChild('picker', { static: false })
  picker!: MatDateRangePicker<any>;


  
  projects: ProjectSpentTime[] = [];
  dailyCards: DailyCard[] = [];



  displayedColumns: string[] = ['title', 'specs', 'implement', 'fixingSpecs', 'fixingImplement'];
  pipe = new DatePipe('en-US');
  selectedValue: any;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  queryCard = '?__repotable=true&__user=2';
  queryProject = '?__user=2&active=true';
  state: any;
  showDailyTable: boolean = true;
  showWeeklyTable: boolean = false;
  showProjectTable: boolean = false;
  stateChange: boolean = false;
  form!: FormGroup;


  constructor(
    private _dateAdapter: DateAdapter<D>,
    private api: ApiServiceService,
    private formBuilder: FormBuilder,



  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '1',
      s1Hours: '',
      s2Hours: '',
      s3Hours: '',
      s4Hours: '',
    });
    this.api.getProject('?__user=2&active=true').subscribe((resp: any) => { this.projects = resp.data, this.mapTestProject() });
    this.api.getDailyCardSpentTime('?max=' + 99 + '&user=2' + '&__template=dailyCardSpentTime.list&spentDate=' + this.selectedValue).subscribe((resp: any) => this.dailyCards = resp.data);

  }
  ngOnChanges(): void{
    this.projectTable();
    this.weeklyTable();

  }
  ngAfterViewInit(): void {
    this.dailyTable();
  }

  submitHours(): void {
    console.log(this.form.getRawValue());
    let data = { 'list': [this.form.getRawValue()] };

    this.api.updateDailyCardSpentTime(data).subscribe((res) => {
      if (res) {
        console.log(res);
      }
    });
    this.stateChange = true;
  }

  async dailyTable(): Promise<void> {
    this.state = "daily";
    sessionStorage.setItem("spentTimeTableState", this.state);
    this.getDailyTable();
    this.showDailyTable = true;
    this.showWeeklyTable = false;
    this.showProjectTable = false;


  }
  async weeklyTable(): Promise<void> {
    this.state = "weekly";
    sessionStorage.setItem("spentTimeTableState", this.state);
    this.getWeeklyTable();
    this.showDailyTable = false;
    this.showWeeklyTable = true;
    this.showProjectTable = false;
  }
  async projectTable(): Promise<void> {
    this.state = "project";
    sessionStorage.setItem("spentTimeTableState", this.state);
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

  mapTestProject(): void {
    this.projects.forEach((p) => {
      if (p.dailyCards == undefined) {
        p.dailyCards = [];
      }
      this.dailyCards.forEach((d) => {

        if (d.project.id == p.id) {
          p.dailyCards.push(d);
        }     
      })
    });
  }

  async getDailyTable(): Promise<void> {
    this.selectedValue = this.pipe.transform(Date.now(), "yyyy-MM-dd");
    this.datepicker.close();
    this.api.getProject('?__user=2&active=true').subscribe((resp: any) => { this.projects = resp.data, this.mapTestProject() });
    this.api.getDailyCardSpentTime('?max=' + 99 + '&user=2' + '&__template=dailyCardSpentTime.list&spentDate=' + this.selectedValue).subscribe((resp: any) => this.dailyCards = resp.data);

  }

  async getWeeklyTable(): Promise<void> {

    const date = this.today;
    const [start, end] = this.selectionFinished(date);
    this.picker.select(start);
    this.picker.select(end);
    this.picker.close();
    let startToString = String(start);
    let endToString = String(end);
    let startDate = this.pipe.transform(startToString, "YYYY-MM-DD");
    let endDate = this.pipe.transform(endToString, "YYYY-MM-DD");
    this.api.getProject('?__user=2&active=true').subscribe((resp: any) => { this.projects = resp.data, this.mapTestProject() });
    this.api.getDailyCardSpentTime('?max=' + 99 + '&user=2' + '&__template=dailyCardSpentTime.list&spentDate_between=' + startDate + '&spentDate_between=' + endDate).subscribe((resp: any) => this.dailyCards = resp.data);

  }

  async getProjectTable(): Promise<void> {
    this.api.getProject('?__user=2&active=true').subscribe((resp: any) => { this.projects = resp.data, this.mapTestProject() });
    this.api.getDailyCardSpentTime('?max=' + 99 + '&user=2&__template=dailyCardSpentTime.list').subscribe((resp: any) => this.dailyCards = resp.data);



  }
}
