import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/authentication/token-interceptor.service';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  personalboard:boolean = false;
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
    this.checkToken();
  }
  countProjectList(){
    this.http.get('http://localhost:8080/api/project')
    .subscribe((res:any)=> {
      this.data = res.data;
      console.log(this.data);
    })
  }
  checkToken(){
    if (localStorage.getItem("refreshToken")!=null){
      var refresh_token = ""
      refresh_token = localStorage.getItem("refreshToken")!;
      let body = new URLSearchParams();
      body.set('grant_type', 'refresh_token');
      body.set('refresh_token', refresh_token);


      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      this.http.post('http://localhost:8080/api/login', body.toString(), options).subscribe((res: any) => {
          console.log(res)
          TokenInterceptorService.accessToken = res.access_token;
          localStorage.setItem("refreshToken",res.refresh_token)
        })
        this.personalboard = true;
    }
    else {
      this.personalboard = true;
      this.countProjectList();
    }
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
