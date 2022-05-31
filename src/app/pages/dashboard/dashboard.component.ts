import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/authentication/token-interceptor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private userListUrl = environment.userListUrl;
  nameMember: any;


  project:boolean = false;
  showPL:boolean = false;
  data:any;

  icon = "keyboard_arrow_up";
  showProject = false;

  id:number = 1;
  title: string | undefined;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.checkToken();
    this.getProject();
  }


  getProject(): void {
    this.http.get('http://localhost:8080/api/project')
    .subscribe((res:any)=> {
      this.data = res.data;
    })
  }

  countProjectList(){

    if(this.icon == "keyboard_arrow_up") {
      this.icon = "keyboard_arrow_down"
      this.showProject = true
    } else {
      this.icon = "keyboard_arrow_up"
      this.showProject = false
    }
  }


  checkToken(){
    if (sessionStorage.getItem("refreshToken")!=null){
      var refresh_token = ""
      refresh_token = sessionStorage.getItem("refreshToken")!;
      let body = new URLSearchParams();
      body.set('grant_type', 'refresh_token');
      body.set('refresh_token', refresh_token);


      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      this.http.post('http://localhost:8080/api/login', body.toString(), options).subscribe((res: any) => {
          console.log(res)
          TokenInterceptorService.accessToken = res.access_token;
          sessionStorage.setItem("refreshToken",res.refresh_token)
        })
    }
    else {
      this.countProjectList();
    }
  }




  gotoDashboard(){
    this.router.navigate(['home/personal-board']);
  }
  gotoSpentTime() {
    this.router.navigate(['home/spent-time']);

  }
  gotoProjectList() {
    this.router.navigate(['home/list']);

  }
  gotoProject(id:number, title:string){
    this.id = id;
    this.title = title;
    this.router.navigate(['home/project/'],{queryParams: {title: this.title, id: this.id}});
  }
  gotoManageTime() {
    this.router.navigate(['home/manage-time']);
  }
  gotoMember() {
    this.router.navigate(['home/member']);
  }


  logout() {
    TokenInterceptorService.accessToken = '';
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);

  }


}
