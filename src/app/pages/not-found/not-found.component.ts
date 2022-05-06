import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.getTasks();
  }

  openDialog() {
    this.dialog.open(TaskDialogComponent, {width: '50%'});
  }
}
