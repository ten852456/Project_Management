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

  private userListUrl = environment.userListUrl;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
    });
  }

  addMember() {
    this.http.post<any>(this.userListUrl, this.form.getRawValue(), {withCredentials: true})
        .subscribe((res: any) => {});
    window.location.reload();
  }

}
