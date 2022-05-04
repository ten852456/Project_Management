import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  message = '';
  form!: FormGroup;

  constructor(    private formBuilder: FormBuilder,
        private http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startDate: '',
      title: '',
      finishDate: '',
      sprint: {id : '1'},
      estimatedDays: '',
      description:''
    });
  }

  addProject() {
    this.http.post('http://localhost:8080/api/task', this.form.getRawValue(), {withCredentials: true})
      .subscribe((res: any) => {
        this.message = JSON.stringify(res);
      });
  }
  
}
