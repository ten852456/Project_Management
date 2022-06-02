import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/api-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  card: any;

  projectList: any;

  taskList: any;

  form!: FormGroup;
  status: string | undefined;

  id!: number;
  title: string | undefined;
  description: string | undefined;
  point: number | undefined;
  donePoint: number | undefined;
  estimated: number | undefined;


  constructor(
    private api: ApiServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CardDetailComponent>,
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getCard();
    this.getProjectList();

    // this.form = this.formBuilder.group({
      // donePoint: '',
      // title: '',
      // point: '',
      // estimatedHours: '',
      // description: '',
      // comments: '',
      // status: '',

      // assignments: {
      //   id: 2
      // },
    // });
  }


  getCard() {
    this.api.getCard("/" + this.data.id).subscribe((res: any) => this.card = res.data);
  }

  getProjectList() {
    this.http.get('http://localhost:8080/api/project')
      .subscribe((res: any) => {
        this.projectList = res.data;
        console.log(this.projectList);
      })
  }

  getTaskList() {
    this.http.get('http://localhost:8080/api/task')
      .subscribe((res: any) => {
        this.taskList = res.data;
        console.log(this.taskList);
      })
  }

  saveCard() {
    this.http.put<any>('http://localhost:8080/api/card/' + this.card.id, this.form.getRawValue())
      .subscribe(data => this.card.id = data.id);
  }

  deleteCard() {
    this.http.delete('http://localhost:8080/api/card/' + this.card.id).subscribe(() => this.status = 'Delete successful');
  }

  addForm() {
    this.form = this.formBuilder.group({
      donePoint: this.donePoint,
      title: this.title,
      point: this.point,
      status: '',
      estimatedHours: this.estimated,
      description: this.description,
    });
    console.log(this.form);

  }


}
