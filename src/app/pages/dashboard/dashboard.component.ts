import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/authentication/token-interceptor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  personalboard:boolean = true;
  spentTime:boolean = false;
  projectList:boolean = false;
  project:boolean = false;
  manageTime:boolean = false;
  member:boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  gotoPersonalboard() {
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
  gotoProject() {
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
