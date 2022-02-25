import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {
  private userId:string;
  private password:string;

  constructor() {
    this.userId = "";
    this.password = "";  
  }

  getId():string {
    return this.userId;
  }
  setId(id:string) {
    this.userId = id;
  }

  getBookTitle():string {
    return this.password;
  }
  setBookTitle(password:string) {
    this.password = password;
  }
  
}
