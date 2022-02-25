import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRegistComponent } from './book-regist.component';

describe('BookRegistComponent', () => {
  let component: BookRegistComponent;
  let fixture: ComponentFixture<BookRegistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookRegistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
