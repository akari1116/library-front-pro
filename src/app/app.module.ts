import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopComponent } from './component/top/top.component';
import { LinkStyleDirective } from './directive/LinkStyle/link-style.directive';
import { BookListComponent } from './component/book-list/book-list.component';
import { BookViewComponent } from './component/book-view/book-view.component';
import { DialogComponent } from './parts/dialog/dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BookRegistComponent } from './component/book-regist/book-regist.component';
import { BookEditComponent } from './component/book-edit/book-edit.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp } from "firebase/app";
import { LoginComponent } from './component/login/login.component';
import { ErrorComponent } from './component/error/error.component';



const firebaseConfig = {
  apiKey: "AIzaSyBrQRvO-sx53Nb9FJfMNKJdyTKerB_88t4",
  authDomain: "fir-ac57a.firebaseapp.com",
  projectId: "fir-ac57a",
  storageBucket: "fir-ac57a.appspot.com",
  messagingSenderId: "505212835116",
  appId: "1:505212835116:web:75b1edfcc0c59b461d4889"
};

const routes:Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: TopComponent},
  {path: 'booklist', component: BookListComponent},
  {path: 'bookview', component: BookViewComponent},
  {path: 'bookregist', component: BookRegistComponent},
  {path: 'bookedit', component: BookEditComponent},
  {path: 'error', component: ErrorComponent}
]

const app = initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    LinkStyleDirective,
    BookListComponent,
    BookViewComponent,
    DialogComponent,
    BookRegistComponent,
    BookEditComponent,
    LoginComponent,
    ErrorComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{enableTracing: true}),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
