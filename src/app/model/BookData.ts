import { Category } from "./Category";

export class BookData {
    constructor(public id:number, public bookTitle:string, public sectionId:string,
         public categoryId:string, public location:string, public isbnCode:number, public image:string) {}
}