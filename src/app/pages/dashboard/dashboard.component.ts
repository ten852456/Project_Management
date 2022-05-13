import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/authentication/token-interceptor.service';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  personalboard:boolean = true;
  dashboard:boolean = false;
  spentTime:boolean = false;
  projectList:boolean = false;
  project:boolean = false;
  manageTime:boolean = false;
  member:boolean = false;
  showPL:boolean = false;
  data:any;

  id:number = 1;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.countProjectList();

  }
  countProjectList(){
    this.http.get('http://localhost:8080/api/project')
    .subscribe((res:any)=> {
      this.data = res.data;
      console.log(this.data);

    })
  }
  showproject(){
    if (this.showPL = false)
    this.showPL = true
    else this.showPL = false;
  }


  gotoDashboard(){
    this.personalboard = true;
    this.spentTime = false;
    this.project = false;
    this.projectList = false;
    this.manageTime = false;
    this.member = false;
  }
  gotoSpentTime() {
    this.personalboard = false;
    this.spentTime = true;
    this.project = false;
    this.projectList = false;
    this.manageTime = false;
    this.member = false;
  }
  gotoProjectList() {
    this.personalboard = false;
    this.spentTime = false;
    this.project = false;
    this.projectList = true;
    this.manageTime = false;
    this.member = false;
  }
  gotoProject(id:number){
    console.log(id);
    this.id = id;
    this.personalboard = false;
    this.spentTime = false;
    this.project = true;
    this.projectList = false;
    this.manageTime = false;
    this.member = false;
  }
  gotoManageTime() {
    this.personalboard = false;
    this.spentTime = false;
    this.project = false;
    this.projectList = false;
    this.manageTime = true;
    this.member = false;
  }
  gotoMember() {
    this.personalboard = false;
    this.spentTime = false;
    this.project = false;
    this.projectList = false;
    this.manageTime = false;
    this.member = true;
  }


  logout() {
    TokenInterceptorService.accessToken = '';
    this.router.navigate(['/login']);

  }
}
