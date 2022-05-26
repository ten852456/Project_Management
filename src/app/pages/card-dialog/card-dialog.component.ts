import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss']
})
export class CardDialogComponent implements OnInit {

  form!: FormGroup;

  data: any;
  id: number | undefined;
  title: string | undefined;

  private cardListUrl = environment.cardListUrl;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

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
        id: 2
      },
      // project: { id: 2, displayText: 'testtext' },
      // todos: '',
      // comments: '',
      // assignments: '',
    });
  }

  addCard() {
    this.http.post<any>(this.cardListUrl, this.form.getRawValue(), { withCredentials: true })
      .subscribe((res: any) => { });
  }

  getProjectList() {
    this.http.get('http://localhost:8080/api/project')
      .subscribe((res: any) => {
        this.data = res.data;
        console.log(this.data);
      })
  }

  selectProject(id: number, title: string) {
    this.id = id;
    this.title = title;
    console.log(this.id);
    console.log(this.title);
  }

}
