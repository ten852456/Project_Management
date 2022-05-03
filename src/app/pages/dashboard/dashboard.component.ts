import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  message = '';

  constructor(
  private http: HttpClient,
  private router: Router,
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user')
    .subscribe({
      next: (res: any) => {
        this.message = `Hi ${res.progile}`;
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

}
