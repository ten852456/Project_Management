import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})

export class MemberDialogComponent implements OnInit {

  form!: FormGroup;
  username: string | undefined;
  roles: string | undefined;
  profile: string | undefined;
  displayName: string = "";

  private userListUrl = environment.userListUrl;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      roles: [],
      profile: {
        displayName: '',
      }
    });

    // this.form = new FormGroup({
    //   username: new FormControl(),
    //   roles: new FormControl(),
    //   profile: new FormGroup({
    //     displayName: new FormControl(),
    //   })
    // })
  }

  addMember() {
    this.form.patchValue({profile: {displayName: this.displayName}});

    this.http.post<any>(this.userListUrl, this.form.getRawValue(), {withCredentials: true})
        .subscribe((res: any) => {});
    window.location.reload();
  }

  selectRole(roles: string) {
      if(roles=='SA') {
        this.form.patchValue({roles: ['ROLE_USER', 'ROLE_SA']});
      }
      else if(roles=='USER') {
        this.form.patchValue({roles: ['ROLE_USER']});
      }
  }

  read(display: any){
    this.displayName += display.data;
  }
  
}
