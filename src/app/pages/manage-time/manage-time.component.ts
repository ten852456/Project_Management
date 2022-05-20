import { Component, AfterViewInit, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDatepicker } from "@angular/material/datepicker";
import { ApiServiceService } from 'src/app/api-service.service';
import { __values } from 'tslib';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


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
  styleUrls: ['./manage-time.component.scss']
})
export class ManageTimeComponent implements AfterViewInit {

  @ViewChild('datepickerFooter', { static: false })
  datepickerFooter!: ElementRef;
  @ViewChild('datepicker', { static: false })
  datepicker!: MatDatepicker<any>;

  displayedColumns: string[] = ['name', 'specs', 'implement', 'fixingSpecs', 'fixingImplement'];
 

  searchText: any;
  projects: Project[] = [];
  dailyCards: DailyCardSpentTime[] = [];
  queryMember = '?__template=project.member&active=true';

  constructor(
    private api: ApiServiceService,
    private _liveAnnouncer: LiveAnnouncer
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



  showTable(): void {
    this.api.getProject(this.queryMember).subscribe((resp: any) => { this.projects = resp.data, this.mapProjects() });
    this.check = 1;
    this.api.getDailyCardSpentTime().subscribe((resp: any) => { this.dailyCards = resp.data });
  }

  today() {
    this.selectedValue = new Date();
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
  }


  showProjectTable(): void {
    console.log("project");
  }



}


