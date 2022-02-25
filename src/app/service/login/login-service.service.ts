import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiConf } from 'src/app/constant/ApiConf';
import { Url } from 'src/app/constant/Url';
import { ConsoleMsg } from 'src/app/constant/ConsoleMsg';



//定数
const API_URL:string = Url.BACK_HOST_LOGIN;

@Injectable({
  providedIn: 'root'
})

export class LoginServiceService {

  loginUser:any;

  private httpOptions: any = {
    headers: new HttpHeaders({
      "Content-Type" : ApiConf.httpOption.contentType,
      "Authorization" : ""
    }),
    "observe": ApiConf.httpOption.observe,
    "body": ApiConf.httpOption.body
  };

  constructor(private httpClient: HttpClient, private router:Router) { }

  //api叩いてログイン情報取得
  login(bookData : any) : Observable<HttpEvent<Response>>{
    return this.httpClient.post<any>(API_URL, bookData, this.httpOptions);
  }

  getLoginData(bookData : Response) : Promise<any> {
               console.log("トークン" + localStorage.getItem("Authorization"));

    return new Promise((resolve, reject) => {
        this.login(bookData).subscribe((data:any) => {
          this.storeToken(data);
          // console.log("トークン" + localStorage.getItem("Authorization"));
          // let 
          // if(localStorage.getItem("Authorization") == null) {

          // }
          try {
            resolve(data);
          }catch(error) {
            console.log(ConsoleMsg.errorMsg.clientError + ":" + error);
            //エラー画面に遷移
            this.router.navigate([Url.routerUrl.error]);       
          }
      }, error => {
        console.log(ConsoleMsg.errorMsg.serverError + ":" + error);
        //エラー画面に遷移
        this.router.navigate([Url.routerUrl.error]);
      })
    });
  }

  storeToken<T>(res: HttpResponse<T>) {
    //トークンをローカルストレージにセット



    let token  = res.headers.get('Authorization');
    if(token != null) {
      localStorage.setItem("Authorization", token);
    }
  }

  // exsistToken() : boolean {
  //   if(localStorage.getItem)
  // }
}
