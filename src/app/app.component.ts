import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';



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

  constructor(private router:Router) {}

  ngOnInit() {

    //ローカルストレージにトークンがなければログイン画面へ遷移
    if(sessionStorage.getItem("Authorization") == null) {
      this.loginValue = false;
      this.router.navigate(["login"]);
    }
  }
}

