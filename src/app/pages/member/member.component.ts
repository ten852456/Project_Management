import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  private userListUrl = environment.userListUrl;

  members: any;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {  
    this.getmember()
  }

  openDialog() {
    this.dialog.open(MemberDialogComponent, {width: '50%'});
  }

  async getmember() {
    this.http.get<any[]>(this.userListUrl)
    .subscribe((nameMember: any) => this.members = nameMember.data);
  }

}
