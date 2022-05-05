import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  form!: FormGroup;
  message = '';

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startDate: '',
      title: '',
      finishDate: '',
      // sprint: { id: '' },
      estimatedDays: '',
      description: ''
    });
  }

  addTask() {
    this.http.post('http://localhost:8080/api/task', this.form.getRawValue(), { withCredentials: true })
      .subscribe((res: any) => {
        this.message = JSON.stringify(res);
      });
  }

}
