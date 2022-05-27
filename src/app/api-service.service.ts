import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getProjectMember(future: string): Observable<any[]> {
    return this.http.get<any[]>(this.Url + 'project' + future);
  }
  getDailyCardSpentTime(future: string): Observable<any[]> {
    return this.http.get<any[]>(this.Url + 'dailyCardSpentTime'+ future );
  }
  getUser(future: string): Observable<any[]> {
    return this.http.get<any[]>(this.Url + 'user' + future );
  }

  getCard(future: string): Observable<any[]> {
    return this.http.get<any[]>(this.Url + 'card' + future);
  }

  updateCard(data:any): Observable<any[]> {
    return this.http.put<any[]>(this.Url + 'card', data );
  }
  updateDailyCardSpentTime(data:{}): Observable<any[]>{
    return this.http.post<any[]>(this.Url + 'custom/dailyCardSpentTime/batchUpdate', data );

  }


  constructor(private http: HttpClient) { }
}
