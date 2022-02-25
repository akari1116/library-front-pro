import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';
import { BookApiService } from 'src/app/service/bookApi/book-api.service';
import { BookData } from 'src/app/model/BookData';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/parts/dialog/dialog.component';
import { Router } from '@angular/router';
import { BookDataService } from 'src/app/service/bookdata/book-data.service';
import { MoveDataService } from 'src/app/service/data/move-data.service';
import { CategoryList } from 'src/app/model/CategoryList';



const selectBoxMessage = {
  doSelect : "選択してください",
  beforeSelect : "先に大カテゴリーを選択してください"

}

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  menuList:CategoryList[];
  sectionList:CategoryList[];
  categoryList:CategoryList[];
  bookData:BookData[];
  formGroup:FormGroup;
  selectSection:string;
  selectCategory:string;
  image:string;
  defaulteImgUrl:string;
  title:string;
  errorMsg:string;
  imgStyle:any;
  defaulteImgStyle:any;

  constructor(private categoryService:CategoryService, private formBuilder:FormBuilder, private bookApiService:BookApiService,
    private dialog:MatDialog, private router:Router, private bookDataService:BookDataService, private moveData:MoveDataService) {
      this.menuList = [];
      this.sectionList = [];
      this.categoryList = [];
      this.bookData = [];
      this.formGroup = this.formBuilder.group({});
      this.selectSection = "";
      this.selectCategory = "";
      this.image = "";
      this.defaulteImgUrl = "assets/image/book1.png";
      this.title = "";
      this.errorMsg = "";
      this.imgStyle = {}
      this.defaulteImgStyle = {}
    }

  ngOnInit(): void {

    this.asyncMenuList();    
    this.asyncBookData(this.moveData.getId());
    
    //サービスからデータを取得
    this.selectCategory = this.moveData.getCategory();
    this.title = this.moveData.getBookTitle();
    this.image = this.moveData.getImage();

    this.formGroup = this.formBuilder.group({
      section: ['', [Validators.required]],
      category: ['', [Validators.required]],
      isbnCode: [this.moveData.getIsbnCode() , [Validators.required]],
      location: [this.moveData.getLocation() , [Validators.required]],
      title: [{value: this.moveData.getBookTitle(), disabled: false}, [Validators.required]],
      image: [this.moveData.getImage()]
    });
  
    this.imgStyle = {
      'width' : '150px',
      'hieght' : '180px',
      'border-width' : '1px',
      'border-style' : 'solid',
      'border-color' : 'black'
    }

    this.defaulteImgStyle = {
      'width' : '150px',
      'hieght' : '150px'
    }
  }

  onBlur() {
    this.asyncBookApi();
  }

  private async asyncMenuList() {
    //API叩いて大区分リストと小区分リストを取得
    await this.categoryService.getCategoryList().then((value) => {
      this.menuList = value;
      this.getSectionList(value);
      for(let list of this.sectionList) {
        if(this.moveData.getSection() == list.sectionId.id) {
          this.selectSection = list.sectionId.section;
        }
      }
      this.categoryList = this.menuList.filter((item, index, self) => {
        return item.sectionId.id == this.moveData.getSection();
      });
    })
  }

  private async asyncBookApi() {
    this.title = "";
    this.image = this.defaulteImgUrl;
    let bookApi : any;
    
    if(this.formGroup.value.isbnCode != "") {
      //楽天BookAPIから指定されたISBNコードのデータを取得
      await this.bookApiService.getApiData(this.formGroup.value.isbnCode).then((value) => {
        bookApi = value;
        for(let apiData of bookApi.Items) {
          this.image = apiData.Item.largeImageUrl;
          this.title = apiData.Item.title;
        }
        if(this.image == this.defaulteImgUrl) {
          this.image = this.defaulteImgUrl;
        }
        this.formGroup.controls.title.enable();
      })
    } else {
    this.image = this.defaulteImgUrl;
    }
  }

  private async asyncBookDataEdit(bookData:any) {
    await this.bookDataService.getEditBookData(bookData);
  }

  private async asyncBookData(id:number) {
    await this.bookDataService.getBookDataId(id).then((value) => {
      this.bookData = value;
    });
  }

  onSectionChange() {
    //セレクトボックスで指定された大区分の小区分リストを取得
    this.selectCategory = selectBoxMessage.beforeSelect;
    this.categoryList = this.menuList.filter((item, index, self) => {
      return item.sectionId.section == this.formGroup.value.section;
    });
  }

  private getSectionList(data:CategoryList[]) {
    this.sectionList = data.filter((item, index, self) => {
      let sectionList = self.map(item => item.sectionId.section);
      return sectionList.indexOf(item.sectionId.section) == index;
    })
  }

  onPageBack() {
    this.router.navigate(['booklist'], { queryParams:{ 'section': this.moveData.getSection()}});
  }

  onClick() {
    if(this.formGroup.invalid || this.selectCategory == selectBoxMessage.beforeSelect) {
      //空欄があれば画面にメッセージを表示
      this.errorMsg = "＊空欄の項目があります。"
    } else {
    //空欄がなければ登録
      for(let list of this.sectionList) {
        if(this.formGroup.value.section == list.sectionId.section) {
          this.formGroup.value.section = list.sectionId.id;
        }
      }
      for(let list of this.categoryList) {
        if(this.formGroup.value.category == list.category) {
          this.formGroup.value.category = list.id;
        }
      }
      //画面で入力されたデータをセット
      let bookData = {
        "id" : this.moveData.getId(),
        "bookTitle" : this.formGroup.value.title,
        "sectionId" : parseInt(this.formGroup.value.section),
        "categoryId" : parseInt(this.formGroup.value.category),
        "location" : this.formGroup.value.location,
        "isbnCode" : parseInt(this.formGroup.value.isbnCode),
        "image" : this.image
      }
        //登録API実行
        this.asyncBookDataEdit(bookData);
        let dLogMessage = "変更しました。";
        let display = "regist";
        //ダイアログボックス表示
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '400px',
          data: { name:'?', dLogMessage:dLogMessage, display:display, section: this.formGroup.value.section, url:"booklist"}
        });
        dialogRef.afterClosed().subscribe(result => {
          //登録が成功した場合、一覧ページに遷移
          this.router.navigate(['booklist'], { queryParams:{ 'section':this.formGroup.value.section}});
      })
    }
  }
}
