import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/service/login/login-service.service';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/parts/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup:FormGroup;
  errorMsg:string;
  mail:string;
  password:string;
  data:any[];

  constructor(private loginService:LoginServiceService, private router:Router, private dialog:MatDialog) {
    this.formGroup = new FormGroup({});
    this.errorMsg = "";
    this.mail = "suzuki.akari@acrovision.jp";
    this.password =  "";
    this.data = [];
  }

  ngOnInit(): void {

    //ローカルストレージにトークンがあればトップ画面へ遷移
    if(localStorage.getItem("Authorization") != null) {
      this.router.navigate([""]);
    }

    this.formGroup = new FormGroup({
      mail: new FormControl('suzuki.akari@acrovision.jp', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  private async asyncLoginData(bookData :any){
    await this.loginService.getLoginData(bookData).then((value) => {
      //ログインが成功したらトップページへ
      this.router.navigateByUrl('/');
    });
  }

  login() {

    let bookData = {
      "email": this.formGroup.value.mail,
      "password" : this.formGroup.value.password
    }

    if(this.formGroup.invalid) {
      this.errorMsg = "＊パスワードまたはIDが入力されていません";
      return;
    } else {
      //ログイン情報認証
      this.asyncLoginData(bookData);
      //サーバー起動メッセージを1分間表示。
      let dLogMessage = "サーバ起動中。1分ほどお待ちください";
      let display = "regist";
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '400px',
        data: { name:'?', dLogMessage:dLogMessage, display:display, section: this.formGroup.value.section, url:"booklist" }
      });
      setTimeout(function(){
        dialogRef.close();
      },59000);
    }
  }

}
