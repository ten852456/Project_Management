import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class SpentTimeService {

  constructor( private http: HttpClient,) { }
  private serverURL = 'http://localhost:8080/api';
  private cardURL = this.serverURL + '/card';
  private projectURL = this.serverURL + '/project';

  getCard(): Observable<any[]> {
    return this.http.get<any[]>(this.cardURL);
  }

  getProject(): Observable<any[]> {
    return this.http.get<any[]>(this.projectURL);
  }
}
