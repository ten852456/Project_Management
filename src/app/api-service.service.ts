import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private taskUrl = 'http://localhost:8080/api/task';
  private Url = 'http://localhost:8080/api/';

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.taskUrl);
  }

  getProject(future: string): Observable<any[]> {
    return this.http.get<any[]>(this.Url + 'project' + future);
  }

  getCard(future: string): Observable<any[]> {
    return this.http.get<any[]>(this.Url + 'card' + future);
  }

  getProjectMember(future: string): Observable<any[]> {
    return this.http.get<any[]>(this.Url + 'project' + future);
  }
  getDailyCardSpentTime(): Observable<any[]> {
    return this.http.get<any[]>(this.Url + 'dailyCardSpentTime' );
  }


  constructor(private http: HttpClient) { }
}
