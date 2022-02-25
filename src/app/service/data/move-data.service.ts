import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class MoveDataService {
  private id:number;
  private bookTitle:string;
  private section:number;
  private category:string;
  private location:string;
  private isbnCode:number;
  private image:string;

  constructor() { 
    this.id = 0;
    this.bookTitle = "";
    this.section = 0;
    this.category = "";
    this.location = "";
    this.isbnCode = 0;
    this.image = "";
  }

  getId():number {
    return this.id;
  }

  setId(id:number) {
    this.id = id;
  }

  getBookTitle():string {
    return this.bookTitle;
  }

  setBookTitle(bookTitle:string) {
    this.bookTitle = bookTitle;
  }

  getSection():number {
    return this.section;
  }

  setSection(section:number) {
    this.section = section;
  }

  getCategory():string {
    return this.category;
  }

  setCategory(category:string) {
    this.category = category;
  }

  getLocation():string {
    return this.location;
  }

  setLocation(location:string) {
    this.location = location;
  }

  getIsbnCode():number {
    return this.isbnCode;
  }

  setIsbnCode(isbnCode:number) {
    this.isbnCode = isbnCode;
  }

  getImage():string {
    return this.image;
  }

  setImage(image:string) {
    this.image = image;
  }
}
