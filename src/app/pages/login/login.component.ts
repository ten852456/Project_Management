import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { TokenInterceptorService } from 'src/app/services/authentication/token-interceptor.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  submit() {
    this.http.post('http://localhost:8080/api/login', this.form.getRawValue(), {withCredentials: true})
      .subscribe((res: any) => {
        TokenInterceptorService.accessToken = res.token;

        this.router.navigate(['/']);
      });
  }
}
