import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})

export class MemberDialogComponent implements OnInit {

  // form = new FormGroup({
  //   username: new FormControl(),
  //   roles: new FormControl(),
  //   profile: new FormGroup({
  //     displayName: new FormControl(),
  //   })
  // })

  form!: FormGroup;
  selectRole: string | undefined;
  roles: string[] = ['System Admin', 'User'];

  private userListUrl = environment.userListUrl;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    // this.form = this.formBuilder.group({
    //   username: '',
    //   profile: ({
    //     displayName: '',
    //   })
    // });
    this.form = new FormGroup({
      username: new FormControl(),
      roles: new FormControl(),
      profile: new FormGroup({
        displayName: new FormControl(),
      })
    })
  }

  addMember() {
    // this.form = this.getForm(data);
    this.http.post<any>(this.userListUrl, this.form.getRawValue(), {withCredentials: true})
        .subscribe((res: any) => {});
    // window.location.reload();
  }

  // getForm(data:any) {
  //   data=data || {  username:null,
  //                   roles: null,
  //                   profile:{
  //                     displayName:null,
  //                   }
  //                }
  //   return new FormGroup({
  //       username: new FormControl(data.username),
  //       roles: new FormControl(data.roles),
  //       profile: new FormGroup({
  //           displayName: new FormControl(data.profile.displayName),
  //        })
  //    })
  // }
}
