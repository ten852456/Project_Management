import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  user: any;

  constructor(
    private api: ApiServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MemberDetailComponent>,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.api.getUser("/" + this.data.id).subscribe((res:any) => this.user = res.data);
  }

  updateUser() {
    this.api.updateUser(this.user.id,this.user).subscribe(() => this.dialogRef.close());
  }

  selectRole(roles: string) {
    if(roles=='SA') {
      this.user.patchValue({roles: ['ROLE_USER', 'ROLE_SA']});
    }
    else if(roles=='USER') {
      this.user.patchValue({roles: ['ROLE_USER']});
    }
}

}