import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  card:any;

  constructor(
    private api: ApiServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CardDetailComponent>,
  ) { }

  ngOnInit(): void {
    this.getCard();
  }

  getCard() {
    this.api.getCard("/" + this.data.id).subscribe((res:any) => this.card = res.data);
  }

  updateCard() {
    this.api.updateCard(this.card.id,this.card).subscribe(() => this.dialogRef.close());
  }


}
