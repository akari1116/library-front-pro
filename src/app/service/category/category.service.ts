import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { CategoryList } from 'src/app/model/CategoryList';
import { ApiConf } from 'src/app/constant/ApiConf';
import { Url } from 'src/app/constant/Url';
import { Router } from '@angular/router';
import { ConsoleMsg } from 'src/app/constant/ConsoleMsg';



//APIのURL
const API_URL:string = Url.BACK_HOST + "category/";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //APIのヘッダー情報
  private httpOptions: any = {
    headers: new HttpHeaders({
      "Content-Type" : ApiConf.httpOption.contentType,
      "Authorization" : sessionStorage.getItem(ApiConf.httpOption.Auth)!
    }),
    "observe": ApiConf.httpOption.observe,
    "body": ApiConf.httpOption.body
  };

  constructor(private httpClient: HttpClient, private router:Router) {}

  //指定された大区分IDの小区分を取得
  private categoryData(sectionId:number) : Observable<HttpEvent<Response>> {
    return this.httpClient.get<Response>(API_URL + sectionId, this.httpOptions);
  }

  //全小区分を取得
  private categoryList() : Observable<HttpEvent<Response>> {
    return this.httpClient.get<Response>(API_URL, this.httpOptions);
  }

  getCategoryData(sectionId:number) : Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.categoryData(sectionId).subscribe((data:any) => {
        try {
          let categoryList : any[] = [];
          //APIから小区分を取得して配列に追加
          for(let category of Object.values(data.body.context.entity)) {
            categoryList.push(category);
          }
          resolve(categoryList);
        } catch(error) {
          console.log(ConsoleMsg.errorMsg.clientError + ":" + error);
          //エラー画面に遷移
          this.router.navigate([Url.routerUrl.error]); 
        }
      }, error => {
        console.log(ConsoleMsg.errorMsg.serverError + ":" + error);
        //エラー画面に遷移
        this.router.navigate([Url.routerUrl.error]);
      });
    })
  }

  getCategoryList() : Promise<CategoryList[]>{
    return new Promise((resolve, reject) => {
      this.categoryList().subscribe((data:any) => {
        try {
          let categoryList : CategoryList[] = [];
          //APIから小区分を取得して配列に追加
          for(let category of data.body.context.entity) {
            categoryList.push(category);
          }
          resolve(categoryList);
        } catch(error) {
          console.log(ConsoleMsg.errorMsg.clientError + ":" + error);
          //エラー画面に遷移
          this.router.navigate([Url.routerUrl.error]); 
        }
      }, error => {
        console.log(ConsoleMsg.errorMsg.serverError + ":" + error);
        //エラー画面に遷移
        this.router.navigate([Url.routerUrl.error]);
      });
    })
  }

}
