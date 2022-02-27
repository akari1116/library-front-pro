import { Component, OnInit,  ElementRef, ViewChild, Renderer2, AfterViewInit} from '@angular/core';
import { SectionService } from '../../service/section/section.service';
import { Section } from 'src/app/model/Section';
import { Router } from '@angular/router';



const imagePath = "assets/image/";

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})

export class TopComponent implements OnInit, AfterViewInit {
  @ViewChild('thisdom') thisdom?: ElementRef;
  @ViewChild('thislink') thislink?: ElementRef;


  constructor(private sectionService : SectionService, private renderer2: Renderer2, private router:Router) {

  }

  ngOnInit(): void {
    if(sessionStorage.getItem("Authorization") == null) {
      this.router.navigate(["login"]);
    }

    if (window.name != "any") {
      location.reload();
      window.name = "any";
    } else {
      window.name = "";
    }
  } 
  
  ngAfterViewInit() {
    //大区分リスト取得
    this.asynSectionList();
  }

  private async asynSectionList(){
    await this.sectionService.getSection().then((value) => {
      let sectionList = value;
      this.sectionDispDom(sectionList);
    });
  }

  private sectionDispDom(sectionList : Section[]) {
    //大区分の分だけDOM追加して画面に表示
    let count = 0;
    sectionList.forEach(section => {
      count++;
      if (this.thisdom !== undefined) {
        const link = this.renderer2.createElement('a');
        const wallTop = this.renderer2.createElement('img');
        this.renderer2.setAttribute(link, "href", "../booklist?section=" + section.id);
        this.renderer2.setAttribute(wallTop, "src", imagePath + section.image);
        this.renderer2.appendChild(this.thisdom.nativeElement, link);
        this.renderer2.appendChild(link, wallTop);
        this.renderer2.addClass(wallTop, 'wall');
        this.renderer2.setStyle(wallTop, 'left', `400px`);
        
        //３列ずつ表示
        if(count % 3 == 0 || sectionList.length == count) {
          const sectionList = this.renderer2.createElement('div');
          const bar = this.renderer2.createElement('div');
          const barBox = this.renderer2.createElement('div');
          const bar2Left = this.renderer2.createElement('div');
          const bar2Right = this.renderer2.createElement('div');
          this.renderer2.appendChild(this.thisdom.nativeElement, sectionList);
          this.renderer2.appendChild(sectionList, bar);
          this.renderer2.appendChild(sectionList, barBox);
          this.renderer2.appendChild(barBox, bar2Left);
          this.renderer2.appendChild(barBox, bar2Right);
          this.renderer2.addClass(sectionList, 'bar');
          this.renderer2.addClass(barBox, 'bar2-box');
          this.renderer2.addClass(bar2Left, 'bar2');
          this.renderer2.addClass(bar2Right, 'bar2');
          this.renderer2.setStyle(bar2Left, 'margin-left', '30px');
          this.renderer2.setStyle(bar2Right, 'margin-left', '515px');
        }
      }
    });
  }

}
