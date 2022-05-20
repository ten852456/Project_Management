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

  private cardListUrl = environment.cardListUrl;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      donePoint: '',
      title: '',
      point: '',
      status: '',
      estimatedHours: '',
      description: '',
      

      // task: '',
      // sprint: '',
      // project: '',
      // todos: '',
      // comments: '',
      // assignments: '',

    });
  }

  addCard() {
    this.http.post<any>(this.cardListUrl, this.form.getRawValue(), {withCredentials: true})
        .subscribe((res: any) => {});
  }

}
