import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CategoryService } from '../../service/category/category.service';
import { Category } from '../../model/Category';
import { BookData } from '../../model/BookData';
import { BookDataService } from '../../service/bookdata/book-data.service';
import { MoveDataService } from 'src/app/service/data/move-data.service';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  categoryArry:Category[];
  bookDataArry:BookData[];
  private bookList:BookData[];
  private selectCategory:string;
  
  constructor(private reqRoute:ActivatedRoute, private categoryService:CategoryService,
    private bookDataService:BookDataService, private router:Router, private moveData:MoveDataService) { 
      
      this.categoryArry = [];
      this.bookDataArry = [];
      this.bookList = [];
      this.selectCategory = "一覧";
      
    }

  ngOnInit(): void {
    //クエリーパラメータで大区分取得
    const params : any = this.reqRoute.snapshot.queryParamMap;
    const sectionId : number = parseInt(params.params.section);

    //カテゴリーリスト取得
    this.asyncCategoryArry(sectionId);
    //指定された大区分の書籍リスト取得
    this.asyncBookDataArry(sectionId);
    
  }

  onChangeCategory(categoryNm:string) {
    switch(categoryNm) {
      case "list":
        //セレクトボックスで一覧選択の場合
        this.selectCategory = "一覧";
        this.bookList = this.bookDataArry;
        break;
      default:
        //セレクトボックスで一覧以外を選択の場合
        this.selectCategory = categoryNm;
        this.bookList = this.categoryBookList(categoryNm, this.bookDataArry);
    }
  }

  private categoryBookList(categoryNm:string, bookDataArry:BookData[]) {
    //該当カテゴリーの書籍だけ絞り込み
    let categoryBook = bookDataArry.filter(value => {
      return value.categoryId == categoryNm;
    });
    return categoryBook;
  }

  private async asyncCategoryArry(sectionId:number){
    await this.categoryService.getCategoryData(sectionId).then((value) => {
      this.categoryArry = value;
    });
  }

  private async asyncBookDataArry(sectionId:number) {
    //topページより選択されたsectionIdに該当する書籍を取得
    await this.bookDataService.getBookDataList(sectionId).then((value) => {
      this.bookDataArry = value;
      this.bookList = value;
    })
  }

  onClick(bookData:BookData) {
    //クエリパラメーターからsectionIdを取得
    const params : any = this.reqRoute.snapshot.queryParamMap;
    const sectionId : number = parseInt(params.params.section);

    //クリックされた書籍情報をserviceへ保存
    this.moveData.setId(bookData.id);
    this.moveData.setBookTitle(bookData.bookTitle);
    this.moveData.setSection(sectionId);
    this.moveData.setCategory(bookData.categoryId);
    this.moveData.setLocation(bookData.location);
    this.moveData.setIsbnCode(bookData.isbnCode);
    this.moveData.setImage(bookData.image);

    this.router.navigate(['bookview']);
  }

  //getter、setter
  getSelectCatelgory() : string {
    return this.selectCategory;
  }

  getCategoryArry() : Category[]{
    return this.categoryArry;
  }

  getBookList() : BookData[] {
    return this.bookList;
  }

}
