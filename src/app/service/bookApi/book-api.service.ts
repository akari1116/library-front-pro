import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private httpClient: HttpClient) {}

  apiData(sectionId:number) : Observable<any> {
    return this.httpClient.get<any[]>("https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&isbn=" 
    + sectionId + "&applicationId=1039676707910937130");
  }

  getApiData(sectionId:number) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiData(sectionId).subscribe((data) => {
        resolve(data);
      }, error => {
        console.log("エラー");
      });
    })
  }

}
