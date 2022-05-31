import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import { TokenInterceptorService } from 'src/app/services/authentication/token-interceptor.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data:any;
  form!: FormGroup;
  decode!:any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: 'u1',
      password: '1234'
    });
  }

  submit() {
    console.log(this.form.getRawValue());
    this.http.post('http://localhost:8080/api/login', this.form.getRawValue(), {withCredentials: true})
      .subscribe((res: any) => {
        TokenInterceptorService.accessToken = res.access_token,console.log(1);
        this.decode = jwt_decode(res.access_token);
        sessionStorage.setItem("uid", this.decode.uid);
        sessionStorage.setItem("refreshToken",res.refresh_token);
        sessionStorage.setItem("username",res.username);
        sessionStorage.setItem("role",res.roles);
        this.router.navigate(['/home/personal-board']);
      },
      (error : HttpErrorResponse)=>{
        alert("Error! Incorrect username or password")
      }
      );
  }
}

