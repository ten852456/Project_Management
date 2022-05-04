import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  tasks: any[] = [];

  display:boolean = false;

  displayBasic: boolean = false;

  showBasicDialog() {
    this.displayBasic = true;
  }

  hideBasicDialog() {
    this.displayBasic = false;
  }

  constructor() { }

  ngOnInit(): void {
    // this.getTasks();
  }

  // getTasks(): void {
  //   this.apiService.getTasks()
  //   .subscribe(tasks => this.tasks = tasks)
  // }

}
