import { Component, OnInit } from '@angular/core';
import { MoveDataService } from 'src/app/service/data/move-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/parts/dialog/dialog.component';
import { BookDataService } from '../../service/bookdata/book-data.service';
import { Router } from '@angular/router';


const dLogInputMessage = {
    office : "オフィス",
    regist : "登録しました。",
    inputName : "名前を入力してください。",
    alreadyRent : "すでに借りられています。",
    alreadyReturn : "すでに返却されています。",
    error: "DB接続エラーが発生しました。管理者に連絡してください"
}

const dLogStateMessage = {
  rent: "rent",
  regist : "regist",
  return : "return",
  input : "input"
}

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})

export class BookViewComponent implements OnInit {

  constructor(private moveData:MoveDataService, private dialog:MatDialog, private bookDataService:BookDataService,
    private router:Router) {
  }

  ngOnInit(): void {}

  onEdit() {
    //bookIdをクエリパラメータに持たせ、変更画面へ遷移
    let bookId = this.moveData.getId()
    this.router.navigate(['bookedit'], { queryParams:{id : bookId}});
  }


  onDLog(state:string) {
    let dLogMessage : string = "";
    let display : string = "";
    let jsonBook : any = this.moveData;

    //ダイアログに表示するメッセージをセット
    if(jsonBook.location != dLogInputMessage.office) {
      //すでに借りられている場合
      dLogMessage = state == dLogStateMessage.rent ? dLogInputMessage.alreadyRent : dLogInputMessage.regist;
      display = dLogStateMessage.regist;
    } else {
      //所在がオフィスの場合
      if(state == dLogStateMessage.return) {
        dLogMessage = dLogInputMessage.alreadyReturn;
        display = dLogStateMessage.regist;
      } else {
        dLogMessage = dLogInputMessage.inputName;
        display = dLogStateMessage.input;
      }
    }
    //ダイアログ表示
    this.showDlog(state, dLogMessage, display, jsonBook);
  }

  private showDlog(state:string, dLogMessage:string, display:string, jsonBook:any) {
    if(jsonBook.location != dLogInputMessage.office && state == dLogStateMessage.return) {
      //所在がオフィスじゃないければ、所在をオフィスにセット
       let locationData = {
        "id" : this.moveData.getId(),
        "location" : dLogInputMessage.office
      }
      try {
        //API実行して、該当書籍のデータ変更
        this.bookDataService.getLocationData(locationData);
      } catch {
        dLogMessage = dLogInputMessage.error;
      }
    }

    //ダイアログへのデータセット
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { name:"?", dLogMessage:dLogMessage, display:display, section:jsonBook.section}
    });

    //ダイアログ呼び出し
    dialogRef.afterClosed().subscribe(result => {
      if(jsonBook.location == dLogInputMessage.office && state == dLogStateMessage.rent && dLogMessage != dLogInputMessage.regist){
        //所在がオフィスであれば、入力された社員名をセット
        let locationData = {
          "id" : this.moveData.getId(),
          "location" : result.name
        }
        try {
          //API実行して、該当書籍のデータ変更
          this.bookDataService.getLocationData(locationData);
          dLogMessage = dLogInputMessage.regist;
          display = dLogStateMessage.regist;
          //再度ダイアログを呼び出し、登録完了のメッセージを表示
          this.showDlog(state, dLogMessage, display, jsonBook);
        }catch{
          console.log("登録処理"); 
        } finally{
        }
      }
    });
  }

  getMoveData(bookData:string) {
    let resultBookData = "";
    switch(bookData) {
    case "title" :
      resultBookData = this.moveData.getBookTitle();
      break
    case "section" :
      resultBookData = this.moveData.getSection().toString();
      break;
    case "image" :
      resultBookData = this.moveData.getImage();
      break;
    case "location" :
      resultBookData = this.moveData.getLocation();
    }
    return resultBookData;
  }
}
