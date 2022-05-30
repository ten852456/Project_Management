import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  form!: FormGroup;

  private projectListUrl = environment.projectListUrl;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      description:'',
      gitRepoUrl:''
    });
  }

  addProject() {
    this.http.post<any>(this.projectListUrl, this.form.getRawValue(), {withCredentials: true})
        .subscribe(() => this.dialogRef.close());
  }

}
