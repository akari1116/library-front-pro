import { Directive, ElementRef, Input, HostListener } from '@angular/core';


@Directive({
  selector: '[appLinkStyle]'
})
export class LinkStyleDirective {
  // private el:ElementRef;
  @Input() white:string = '';
  @Input() brown:string = '';

  constructor(private el: ElementRef) { 
    // this.el
  }

  ngOnInit() {
    this.mouseOut();
  }

  @HostListener('mouseenter', ['$event.target']) mouseOver() {
    //マウスオーバー時リンクの色と背景色を設定
    this.el.nativeElement.style.color = this.brown;
    this.el.nativeElement.style.backgroundColor = this.white;
  }
  
  @HostListener('mouseleave', ['$event.target']) mouseOut() {
    this.el.nativeElement.style.color = this.white;
    this.el.nativeElement.style.backgroundColor = this.brown;
    this.el.nativeElement.style.textDecoration = 'none';
    }

}
