import { Injectable } from '@angular/core';
import { BookData } from 'src/app/model/BookData';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { ApiConf } from 'src/app/constant/ApiConf';
import { Url } from 'src/app/constant/Url';
import { ConsoleMsg } from 'src/app/constant/ConsoleMsg';
import { Router } from '@angular/router';




//定数
const API_URL:string =  Url.BACK_HOST + "bookdata/";

@Injectable({
  providedIn: 'root'
})
export class BookDataService {
  private httpOptions: any = {
    headers: new HttpHeaders({
      "Content-Type" : ApiConf.httpOption.contentType,
      "Authorization" : localStorage.getItem(ApiConf.httpOption.Auth)!
    }),
    "observe": ApiConf.httpOption.observe,
    "body": ApiConf.httpOption.body
  };

  constructor(private httpClient: HttpClient, private router:Router) {}


  private bookDataList(sectionId : number) : Observable<HttpEvent<Response>> {
    return this.httpClient.get<Response>(API_URL + sectionId, this.httpOptions);
  }

  private bookDataId(bookId : number) : Observable<HttpEvent<Response>> {
    return this.httpClient.get<Response>(API_URL + "bookId/" + bookId, this.httpOptions);
  }

  private locationData(location:any) : Observable<HttpEvent<Response>> {
    return this.httpClient.post<Response>(API_URL + "locationEdit/", location, this.httpOptions);
  }

  private registBookData(bookData:any) : Observable<HttpEvent<Response>> {
    return this.httpClient.post<Response>(API_URL + "bookRegist/", bookData, this.httpOptions);
  }

  private editBookData(bookData:any) : Observable<HttpEvent<Response>> {
    return this.httpClient.post<Response>(API_URL + "bookEdit/", bookData, this.httpOptions);
  }

  getBookDataList(sectionId : number) : Promise<BookData[]> {
    return new Promise((resolve, reject) => {
      this.bookDataList(sectionId).subscribe((data : any) => {
        try {
          let bookList : any[] = [];
          for(let book of Object.values(data.body.context.entity)) {
            bookList.push(book);
          }
          resolve(bookList);
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
    })
  }

  getBookDataId(bookId : number) : Promise<BookData[]> {
    return new Promise((resolve, reject) => {
      this.bookDataId(bookId).subscribe((data:any) => {
        try {
          let bookList : BookData[] = data.body.context.entity;
          resolve(bookList);
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
    })
  }

  getLocationData(location : any) {
    return new Promise((resolve, reject) => {
      this.locationData(location).subscribe((data:any) => {
        try {
        resolve(data.body);
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
    })
  }

  getRegistBookData(bookData:any) {
    console.log("データ");
    return new Promise((resolve, reject) => {
      this.registBookData(bookData).subscribe((data:any) => {
        try {
          resolve(data.body);
        } catch(error) {
          console.log(ConsoleMsg.errorMsg.clientError + ":" + error);
          //エラー画面に遷移
          this.router.navigate([Url.routerUrl.error]);  
        }
      }, error => {
        console.log(ConsoleMsg.errorMsg.serverError + ":" + error);
        //エラー画面に遷移
        this.router.navigate([Url.routerUrl.error]); console.log("エラー");
      })
    })
  }

  getEditBookData(bookData:any) {
    return new Promise((resolve, reject) => {
      this.editBookData(bookData).subscribe((data:any) => {
        try {
          resolve(data.body);
        } catch(error) {
          console.log(ConsoleMsg.errorMsg.clientError + ":" + error);
          //エラー画面に遷移
          this.router.navigate([Url.routerUrl.error]); 
        }
      }, error => { 
        console.log(ConsoleMsg.errorMsg.serverError + ":" + error);
        //エラー画面に遷移
        this.router.navigate([Url.routerUrl.error]); console.log("エラー");console.log("エラー4");
      })
    })
  }
}
