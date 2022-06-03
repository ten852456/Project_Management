import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { MatDatepicker, MatDateRangePicker, MAT_DATE_RANGE_SELECTION_STRATEGY, MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DateAdapter } from '@angular/material/core';
import { Card } from '../manage-time/manage-time.component';
import { __values } from 'tslib';
import { DatePipe } from '@angular/common';
import { SpentTimeDialogComponent } from './spent-time-dialog/spent-time-dialog.component';
import { MatDialog } from '@angular/material/dialog';




export interface ProjectSpentTime {
  id: number;
  title: string;
  dailyCards: DailyCard[];
  addHours: map[];
  cards: eachCard[];
  sumSpecs: number;
  sumImplement: number;
  sumFixingSpecs: number;
  sumFixingImplement: number;
  sumAllTestCard: number;
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
  user: number;
  sumHours: number;
}
export interface Project {
  id: number,
  displayText: string
}
export interface map {
  noDailyCard: boolean;
  id: number;
  displayText: string;
  specs: number;
  implement: number;
  fixingSpecs: number;
  fixingImplement: number;
}
export interface eachCard {
  id: number;
  title: string;
  s1Hours: number;
  s2Hours: number;
  s3Hours: number;
  s4Hours: number;
  project: Project;
  sumHours: number;
  user: number;
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
  cards: eachCard[] = [];

  addHoursColumn: string[] = ['title', 'specs', 'implement', 'fixingSpecs', 'fixingImplement', 'symbol'];
  displayedColumns: string[] = ['title', 'specs', 'implement', 'fixingSpecs', 'fixingImplement', 'sumEachTestCard'];
  pipe = new DatePipe('en-US');
  selectedValue: any;
  selectedDate: any;
  check!: boolean;

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
  formn!: FormGroup;
  constructor(
    private _dateAdapter: DateAdapter<D>,
    private api: ApiServiceService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
   
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      s1Hours: '',
      s2Hours: '',
      s3Hours: '',
      s4Hours: '',
    });
    this.dailyTable();
  }
  ngAfterViewInit() {
    
  }

  addNewCardToday(id: number, specs: number, implement: number, fixingSpecs: number, fixingImplement: number,): void {
    this.selectedValue = this.pipe.transform(Date.now(), "yyyy-MM-dd");
    console.log(implement);
    this.formn = this.formBuilder.group({
      s1Hours: specs.toString(),
      s2Hours: implement.toString(),
      s3Hours: fixingSpecs.toString(),
      s4Hours: fixingImplement.toString(),
      spentDate: this.selectedValue.toString(),
      card: id.toString(),
      user: '2'
    });
    let data = { 'list': [this.formn.getRawValue()] };

    this.api.updateDailyCardSpentTime(data).subscribe((res) => {
      if (res) {
        console.log(res);
      }
    });
   
  }

  submitHours(index:number): void {
   
    console.log(this.form.getRawValue());
    console.log(index);
    this.form.addControl('id', this.formBuilder.control(index));
    let data = { 'list': [this.form.getRawValue()]};
    console.log(data);
    this.api.updateDailyCardSpentTime(data).subscribe((res) => {
      if (res) {
        console.log(res);
      }
    }); 
    //this.dialog.open(SpentTimeDialogComponent, {width: '50%', data:});
  }
  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = this.pipe.transform(event.value, 'yyyy-MM-dd');
  }

  showTable() {
    console.log(this.selectedDate);
    this.api.getProject('?__user=2&active=true').subscribe((resp: any) => { this.projects = resp.data, this.mapTestProject() });
    this.api.getDailyCardSpentTime('?max=' + 99 + '&user=2' + '&__template=dailyCardSpentTime.list&spentDate=' + this.selectedDate).subscribe((resp: any) => this.dailyCards = resp.data);

  }

  dailyTable() {
    this.state = "daily";
    sessionStorage.setItem("spentTimeTableState", this.state);
    this.showDailyTable = true;
    this.showWeeklyTable = false;
    this.showProjectTable = false;
    this.getDailyTable();



  }
  weeklyTable() {
    this.state = "weekly";
    sessionStorage.setItem("spentTimeTableState", this.state);
    this.getWeeklyTable();
    this.showDailyTable = false;
    this.showWeeklyTable = true;
    this.showProjectTable = false;

  }
  projectTable() {
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

    let map = [];
    let sum = 0;
    for (let i = 0; i < this.projects.length; i++) {
      for (let j = 0; j < this.cards.length; j++) {
        let specs = 0;
        let implement = 0;
        let fixingSpecs = 0;
        let fixingImplement = 0;
        if (this.projects[i].id == this.cards[j].project.id) {
          let check: boolean = true;
          for (let k = 0; k < this.dailyCards.length; k++) {
            if (this.cards[j].id == this.dailyCards[k].card.id) {
              check = false;
            }
            if (check) {
              map.push({
                "noDailyCard": true,
                "id": this.cards[j].id,
                "displayText": this.cards[j].title,
                "specs": 0,
                "implement": 0,
                "fixingSpecs": 0,
                "fixingImplement": 0
              })
              this.addNewCardToday(this.cards[j].id, 0, 0, 0, 0);
            } else {
              specs = this.dailyCards[j].s1Hours;
              implement = this.dailyCards[j].s2Hours;
              fixingSpecs = this.dailyCards[j].s3Hours;
              fixingImplement = this.dailyCards[j].s4Hours;
              map.push({
                "noDailyCard": false,
                "id": this.dailyCards[j].card.id,
                "displayText": this.dailyCards[j].card.displayText,
                "specs": this.dailyCards[j].s1Hours,
                "implement": this.dailyCards[j].s2Hours,
                "fixingSpecs": this.dailyCards[j].s3Hours,
                "fixingImplement": this.dailyCards[j].s4Hours
  
              })
            }
          }
          map.sort(function (a, b) {
            var x = a.displayText.toLowerCase();
            var y = b.displayText.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          });
          this.projects[i].addHours = map;
        }
      }
    }
    this.projects
      .sort(function (a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
  }
  mapWeekly() {
    let index = 0;
    let map = [];
    for (let i = 0; i < this.projects.length; i++) {
      let sumS1 = 0
      let sumS2 = 0;
      let sumS3 = 0;
      let sumS4 = 0;
      let sum = 0;
      this.projects[i].sumSpecs = 0;
      this.projects[i].sumImplement = 0;
      this.projects[i].sumFixingSpecs = 0;
      this.projects[i].sumFixingImplement = 0;
      this.projects[i].sumAllTestCard = 0;

      for (let j = 0; j < this.dailyCards.length; j++) {
        if (this.dailyCards[j].project.id == this.projects[i].id) {

          sumS1 += this.dailyCards[j].s1Hours;
          sumS2 += this.dailyCards[j].s2Hours;
          sumS3 += this.dailyCards[j].s3Hours;
          sumS4 += this.dailyCards[j].s4Hours;
          sum += this.dailyCards[j].s1Hours + this.dailyCards[j].s2Hours + this.dailyCards[j].s3Hours + this.dailyCards[j].s4Hours;
          this.projects[i].sumSpecs += sumS1;
          this.projects[i].sumImplement += sumS2;
          this.projects[i].sumFixingSpecs += sumS3;
          this.projects[i].sumFixingImplement += sumS4;
          this.projects[i].sumAllTestCard += sum;
          
          map.push({
            "spentDate": this.dailyCards[j].spentDate.toString(),
            "id": index,
            "s1Hours": sumS1,
            "s2Hours": sumS2,
            "s3Hours": sumS3,
            "s4Hours": sumS4,
            "sumHours": sum,
            "card": { 'id': this.dailyCards[j].card.id, 'displayText': this.dailyCards[j].card.displayText },
            "project": { 'id': this.dailyCards[j].project.id, 'displayText': this.dailyCards[j].project.displayText },
            "user": 2,
          })
        }
       
        map.sort(function (a, b) {
          var x = a.card.displayText.toLowerCase();
          var y = b.card.displayText.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
        var list = map.filter(value =>{return value.spentDate == this.selectedValue.toString()});
        console.log(list);
        this.projects[i].dailyCards = map;
      }
      index++;
    }
    this.projects
      .sort(function (a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
  }
  mapProject() {
    let index = 0;
    let map = [];
    for (let i = 0; i < this.projects.length; i++) {
      let sumS1 = 0
      let sumS2 = 0;
      let sumS3 = 0;
      let sumS4 = 0;
      let sum = 0;
      this.projects[i].sumSpecs = 0;
      this.projects[i].sumImplement = 0;
      this.projects[i].sumFixingSpecs = 0;
      this.projects[i].sumFixingImplement = 0;
      this.projects[i].sumAllTestCard = 0;

      for (let j = 0; j < this.dailyCards.length; j++) {
        if (this.dailyCards[j].project.id == this.projects[i].id) {

          sumS1 += this.dailyCards[j].s1Hours;
          sumS2 += this.dailyCards[j].s2Hours;
          sumS3 += this.dailyCards[j].s3Hours;
          sumS4 += this.dailyCards[j].s4Hours;
          sum += this.dailyCards[j].s1Hours + this.dailyCards[j].s2Hours + this.dailyCards[j].s3Hours + this.dailyCards[j].s4Hours;
          this.projects[i].sumSpecs += sumS1;
          this.projects[i].sumImplement += sumS2;
          this.projects[i].sumFixingSpecs += sumS3;
          this.projects[i].sumFixingImplement += sumS4;
          this.projects[i].sumAllTestCard += sum;
          
          map.push({
            "spentDate": this.dailyCards[j].spentDate.toString(),
            "id": index,
            "s1Hours": sumS1,
            "s2Hours": sumS2,
            "s3Hours": sumS3,
            "s4Hours": sumS4,
            "sumHours": sum,
            "card": { 'id': this.dailyCards[j].card.id, 'displayText': this.dailyCards[j].card.displayText },
            "project": { 'id': this.dailyCards[j].project.id, 'displayText': this.dailyCards[j].project.displayText },
            "user": 2,
          })
        }
       
        map.sort(function (a, b) {
          var x = a.card.displayText.toLowerCase();
          var y = b.card.displayText.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        });
        var list = map.filter(value =>{return value.spentDate == this.selectedValue.toString()});
        console.log(list);
        this.projects[i].dailyCards = map;
      }
      index++;
    }
    this.projects
      .sort(function (a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
  }

  async getDailyTable(): Promise<void> {
    this.selectedValue = this.pipe.transform(Date.now(), "yyyy-MM-dd");
    this.datepicker.close();
    this.api.getCard('?user=2&__reportable=true').subscribe((resp: any) => { this.cards = resp.data });
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
    this.api.getProject('?__user=2&active=true').subscribe((resp: any) => { this.projects = resp.data });
    this.api.getDailyCardSpentTime('?max=' + 99 + '&user=2' + '&__template=dailyCardSpentTime.list&spentDate_between=' + startDate + '&spentDate_between=' + endDate).subscribe((resp: any) => { this.dailyCards = resp.data, this.mapWeekly() });
  }
  getProjectTable() {
    this.api.getProject('?__user=2&active=true').subscribe((resp: any) => { this.projects = resp.data, this.mapProject() });
    this.api.getDailyCardSpentTime('?max=' + 99 + '&user=2&__template=dailyCardSpentTime.list').subscribe((resp: any) => this.dailyCards = resp.data);
  }
}
