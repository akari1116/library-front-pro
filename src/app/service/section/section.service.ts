import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Section } from 'src/app/model/Section';
import { Router } from '@angular/router';
import { ApiConf } from 'src/app/constant/ApiConf';
import { ConsoleMsg } from 'src/app/constant/ConsoleMsg';
import { Url } from 'src/app/constant/Url';



//APIのURL
const API_URL:string = Url.BACK_HOST + "section"; 

@Injectable({
  providedIn: 'root'
})


//大区分を取得するサービス
export class SectionService {

  //APIのヘッダー情報
  private httpOptions: any = {
    headers: new HttpHeaders({
      "Content-Type" : ApiConf.httpOption.contentType,
      "Authorization" : sessionStorage.getItem(ApiConf.httpOption.Auth)!
    }),
    "observe": ApiConf.httpOption.observe,
    "body": ApiConf.httpOption.body
  };

  constructor(private httpClient: HttpClient, private router:Router) { }

  //api叩いて全大区分データ取得
  allSectionData() : Observable<HttpEvent<Response>>{
    return this.httpClient.get<Response>(API_URL, this.httpOptions)
  }

  //非同期で大区分データを取得
  getSection() : Promise<Section[]> {
    return new Promise((resolve, reject) => {
      this.allSectionData().subscribe((data:any) => {
        try {
          let section : any[] = [];
          //APIから大区分リストを取得して配列に追加
          for(let sectionList of Object.values(data.body.context.entity)) {
            section.push(sectionList);
          }
          resolve(section);
        } catch(error) {
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
}
