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
  dashboard:boolean = true;
  spentTime:boolean = false;
  projectList:boolean = false;
  project:boolean = false;
  showPL:boolean = false;
  data:any;

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
    this.dashboard = true;
    this.spentTime = false;
    this.project = false;
    this.projectList = false;
  }
  gotoSpentTime(){
    this.dashboard = false;
    this.spentTime = true;
    this.project = false;
    this.projectList = false;
  }
  gotoProjectList(){
    this.dashboard = false;
    this.spentTime = false;
    this.project = false;
    this.projectList = true;
  }  
  gotoProject(Projectname:string){
    console.log(Projectname);
    this.dashboard = false;
    this.spentTime = false;
    this.project = true;
    this.projectList = false;
  }


  logout(){
    TokenInterceptorService.accessToken = '';
    this.router.navigate(['/login']);

  }
}
