import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { ApiServiceService } from 'src/app/api-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardDialogComponent } from 'src/app/pages/card-dialog/card-dialog.component';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-personal-board',
  templateUrl: './personal-board.component.html',
  styleUrls: ['./personal-board.component.scss']
})
export class PersonalBoardComponent implements OnInit {

  value = '';



  unassigned!:any;
  todo!:any;
  doing!:any;
  done!:any;
  completed!:any;
  board!: Board;

  searchText: any;

  // uid = sessionStorage.getItem("uid");
  uid = 0;

  data:any;

  datatask:any;

  id: number | undefined;
  title = sessionStorage.getItem("username") + "'s Board";

  constructor(
    private api: ApiServiceService,
    public dialog: MatDialog,
    private http: HttpClient,
  ) {

  }

  ngOnInit(){
    this.getPersonalCards();
    this.getProjectList();
    this.getTask();
    this.filterCards()
  }

   getPersonalCards() {
    this.api.getCard('?status=UNASSIGNED&__user=' + this.uid + '&project=' + this.id).subscribe((res:any) => {this.unassigned =  res.data,
      this.api.getCard('?status=TODO&__user=' + this.uid + '&project=' + this.id).subscribe((res:any) => {this.todo =  res.data,
        this.api.getCard('?status=DOING&__user=' + this.uid + '&project=' + this.id).subscribe((res:any) => {this.doing =  res.data,
          this.api.getCard('?status=DONE&__user=' + this.uid + '&project=' + this.id).subscribe((res:any) => {this.done =  res.data,
            this.api.getCard('?status=COMPLETED&__user=' + this.uid + '&project=' + this.id).subscribe((res:any) => {this.completed =  res.data, this.setBoard()});
          });
        });
      });
    });
  }

  filterCards() {
    this.api.getCard('?status=UNASSIGNED&project=' + this.id).subscribe((res:any) => {this.unassigned =  res.data,
      this.api.getCard('?status=TODO&project=' + this.id).subscribe((res:any) => {this.todo =  res.data,
        this.api.getCard('?status=DOING&project=' + this.id).subscribe((res:any) => {this.doing =  res.data,
          this.api.getCard('?status=DONE&project=' + this.id).subscribe((res:any) => {this.done =  res.data,
            this.api.getCard('?status=COMPLETED&project=' + this.id).subscribe((res:any) => {this.completed =  res.data, this.setBoard()});
          });
        });
      });
    });
  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      // this.replacStatus();
    }
  }

  setBoard():void {
    this.board = new Board('Test Board',[
      new Column('Unassigned',this.unassigned,'UNASSIGNED'),
      new Column('To do',this.todo,'TODO'),
      new Column('Doing',this.doing,'DOING'),
      new Column('Done',this.done,'DONE'),
      new Column('Completed',this.completed,'COMPLETED'),
    ]);
  }

  // test(event:any) {
  //   this.api.updateCard(x.id, column.status).subscribe(res => console.log(res))
  // }

  // replacStatus():void {
  //   this.board.columns.forEach(column =>  {
  //       column.cards.forEach(x => x.status = column.status)
  //  });
  // }

  replacStatus():void {
    this.board.columns.forEach(column =>  {
      column.cards.forEach(x => this.api.updateCard(x.id, column.status).subscribe(res => console.log(res)))
    });
  }


  openDialog(sendStatus:string) {
    this.dialog.open(CardDialogComponent, {width: '50%' , data:{status:sendStatus}});
    this.dialog.afterAllClosed
    .subscribe(() => this.getPersonalCards());
  }

  selectProject(id:number, title:string){
    this.id = id;
    this.title = title;
  }

  getProjectList(){
    this.http.get('http://localhost:8080/api/project')
    .subscribe((res:any)=> {
      this.data = res.data;
      console.log(this.data);
    })
  }

  getTask(){
    this.http.get('http://localhost:8080/api/task')
    .subscribe((res:any)=> {
      this.datatask = res.data;
      console.log(this.datatask);
    })
  }

  // getcardsUnassigned():any{
  //   this.api.getcard('?status=UNASSIGNED').subscribe((res:any) => {this.unassigned =  res.data});
  // }

  // getcardsTodo():any{
  //   this.api.getcard('?status=TODO').subscribe((res:any) => {this.todo =  res.data});
  // }

  // getcardsDoing():any{
  //   this.api.getcard('?status=DOING').subscribe((res:any) => {this.doing =  res.data});
  // }

  // getcardsDone():any{
  //   this.api.getcard('?status=DONE').subscribe((res:any) => {this.done =  res.data});
  // }

  // getcardsCompleted():any{
  //   this.api.getcard('?status=COMPLETED').subscribe((res:any) => {this.completed =  res.data});
  // }


}
