import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ApiServiceService } from 'src/app/api-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss']
})
export class CardDialogComponent implements OnInit {

  form!: FormGroup;

  status:any;

  projectList: any;
  id!: number;
  title: string | undefined;
  description: string | undefined;
  point: number | undefined;
  donePoint:number | undefined;
  estimated:number | undefined;

  private cardListUrl = environment.cardListUrl;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiServiceService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CardDialogComponent>,
    ) { }

  ngOnInit(): void {
    this.getProjectList();
    this.form = this.formBuilder.group({
      donePoint: '',
      title: '',
      point: '',
      status: '',
      estimatedHours: '',
      description: '',


      task: {
        id: ''
      },
    });
  }

  addCard() {
    this.http.post<any>(this.cardListUrl, this.form.getRawValue(), { withCredentials: true })
      .subscribe((res: any) => this.replacStatus(res.data.id));
  }

  getProjectList() {
    this.http.get('http://localhost:8080/api/project')
      .subscribe((res: any) => {
        this.projectList = res.data;
        console.log(this.projectList);
      })
  }


  replacStatus(id:any):void {
    this.api.updateCard(id, this.data.status).subscribe(res => console.log(res))
  }


  selectProject(id: number, title: string) {
    this.form = this.formBuilder.group({
      donePoint: this.donePoint,
      title: this.title,
      point: this.point,
      status: '',
      estimatedHours: this.estimated,
      description: this.description,
      task: {
        id: id
      },
    });
  }

}
