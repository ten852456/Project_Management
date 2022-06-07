import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';
import { MatSnackBar, MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MemberDetailComponent } from './member-detail/member-detail.component';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  private userListUrl = environment.userListUrl;

  members: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
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

  openSnackBar() {
    this._snackBar.open('Confirm User Deletion', 'YES', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openDetail(id: any) {
    this.dialog.open(MemberDetailComponent, {width: '50%', data:{id:id}});
  }

  // detailMember(member: any) {
  //   let dialogRef = this.dialog.open(MemberDialogComponent, {width: '50%'});

  //   dialogRef.componentInstance.username = member.username;
  //   dialogRef.componentInstance.roles = member.roles;
  //   dialogRef.componentInstance.displayName = member.profile.displayName;
  // }
  
}
