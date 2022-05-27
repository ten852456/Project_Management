import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';import { jsDocComment } from '@angular/compiler';
@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})

export class MemberDialogComponent implements OnInit {

  // form = new FormGroup({
  //   username: new FormControl(),
  //   roles: new FormControl('ROLE_USER', Validators.required),
  //   profile: new FormGroup({
  //     displayName: new FormControl(),
  //   })
  // })

  form!: FormGroup;
  username: string | undefined;
  roles: string | undefined;
  profile: string | undefined;
  displayName: string = "";

  // selectRole: string | undefined;
  // roles: string[] = ['System Admin', 'User'];
  // selected = '?roles=ROLE_USER';

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

    // this.form = this.getForm(data);
    this.http.post<any>(this.userListUrl, this.form.getRawValue(), {withCredentials: true})
        .subscribe((res: any) => {});
    // window.location.reload();
  }

  // addName(name: string) {
  //   this.form.patchValue({profile: {displayName: name}});
  //   this.addMember();
  // }

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
