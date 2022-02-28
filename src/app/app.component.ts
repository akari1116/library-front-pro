import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/parts/dialog/dialog.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  formGroup:FormGroup = new FormGroup({}); 
  loginValue:boolean = true;
  errorMsg:string = "";
  title:string = "";
  mail:string = "";
  password:string =  "";
  auth:any;
  eventData : string = "";

  constructor(private router:Router, private dialog:MatDialog) {}

  ngOnInit() {

    //ローカルストレージにトークンがなければログイン画面へ遷移
    if(sessionStorage.getItem("Authorization") == null) {
      this.loginValue = false;
      this.router.navigate(["login"]);
    }
  }

  onClick() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { name:"?", dLogMessage:"ログアウトしました。", display:"regist", section:"", url:"login"}
    });

    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    });
  }
}

