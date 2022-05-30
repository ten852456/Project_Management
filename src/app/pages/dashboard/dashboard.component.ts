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
  }

  countProjectList(){
    this.http.get('http://localhost:8080/api/project')
    .subscribe((res:any)=> {
      this.data = res.data;
      console.log(this.data);
    })
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
    this.router.navigate(['personal-board'],{relativeTo: this.route});
  }
  gotoSpentTime() {
    this.router.navigate(['spent-time'],{relativeTo: this.route});

  }
  gotoProjectList() {
    this.router.navigate(['list'],{relativeTo: this.route});

  }
  gotoProject(id:number, title:string){
    this.router.navigate(['project/' + title],{relativeTo: this.route});
    this.id = id;
    this.title = title;

  }
  gotoManageTime() {
    this.router.navigate(['manage-time'],{relativeTo: this.route});
  }
  gotoMember() {
    this.router.navigate(['member'],{relativeTo: this.route});
    this.getMember();
  }


  logout() {
    TokenInterceptorService.accessToken = '';
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);

  }

  getMember(): void {
    this.http.get<any[]>(this.userListUrl)
    .subscribe((nameMember) => this.nameMember = nameMember);
  }

}
