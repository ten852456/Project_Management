import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { __values } from 'tslib';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker, MatDateRangePicker, MAT_DATE_RANGE_SELECTION_STRATEGY } from "@angular/material/datepicker";
import { DateAdapter } from '@angular/material/core';

export interface MemberList {
  userId: number;
  id: number;
  displayText: string;
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  sumHours: number;
}

export interface Project {
  id: number;
  displayText: string;
  memberList: MemberList[];
  sumHours: number;
  sumSpecs: number;
  sumImplement: number;
  sumFixingSpecs: number;
  sumFixingImplement: number;
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

  displayedColumns: string[] = ['name', 'specs', 'implement', 'fixingSpecs', 'fixingImplement'];
 
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  searchText: any;
  projects: Project[] = [];
  dailyCards: DailyCardSpentTime[] = [];
  queryMember = '?__template=project.member&active=true';

  constructor(
    private api: ApiServiceService,
    private _liveAnnouncer: LiveAnnouncer,
    private _dateAdapter: DateAdapter<D>
  ) { }

  check !: number;
  selectedValue: Date | null = null;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource = new MatTableDataSource(this.projects);

  ngAfterViewInit() {
    this.showTable();
    this.dataSource.sort = this.sort;

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

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

  showTable(): void {
    this.api.getProject(this.queryMember).subscribe((resp: any) => { this.projects = resp.data, this.mapProjects() });
    this.check = 1;
    this.api.getDailyCardSpentTime('').subscribe((resp: any) => { this.dailyCards = resp.data });
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
        }
      }
      )
    );
    this.projects.forEach((__values) => {
      __values.memberList.forEach((__member) =>
        this.dailyCards.forEach((__values) => {
          if (__values.user.id == __member.userId) {
            __member.s1 = __values.s1Hours;
            __member.s2 = __values.s2Hours;
            __member.s3 = __values.s3Hours;
            __member.s4 = __values.s4Hours;
            __member.sumHours = __values.sumHours;

          }


        }))
    });
    this.projects.forEach((__values) => {
      __values.sumSpecs = 0;
      __values.sumImplement = 0;
      __values.sumFixingSpecs = 0;
      __values.sumFixingImplement = 0;
      __values.sumHours = 0;
      __values.memberList.forEach((__member) => {

        __values.sumSpecs += __member.s1;
        __values.sumImplement += __member.s2;
        __values.sumFixingSpecs += __member.s3;
        __values.sumFixingImplement += __member.s4;
        __values.sumHours += __member.sumHours;
      }
      )
    });


  }

  showDailyTable(): void {
    this.selectedValue = new Date();
    this.datepicker.close();
    this.projects.forEach((__values) => {

      console.log(__values.sumHours)

    });


    //console.log(this.projects[i].memberList[0]);
    //console.log(this.dailyCards[i].user.id);




  }

  showWeeklyTable(): void {
    console.log("week");

    const date = this.today;
    const [start, end] = this.selectionFinished(date);
    this.picker.select(start);
    this.picker.select(end);
    this.picker.close();
  }


  showProjectTable(): void {
    console.log("project");
  }



}


