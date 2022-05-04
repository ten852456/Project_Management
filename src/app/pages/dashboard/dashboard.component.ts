import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  message = '';
  params = new HttpParams().set('__template', 'card.dialog');

  constructor(
  private http: HttpClient,
  private router: Router,
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/card/1',{ params: this.params })
    .subscribe({
      next: (res: any) => {
        let data = res.data;
        this.message = `Hi ${data.title}`;
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

}
