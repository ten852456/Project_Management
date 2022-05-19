import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {

  @Input() members: any;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {  
    
  }

  openDialog() {
    this.dialog.open(MemberDialogComponent, {width: '50%'});
  }

}
