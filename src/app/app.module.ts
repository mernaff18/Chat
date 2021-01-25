import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule} from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppComponent } from './app.component';
import { NewModule } from './new/new.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { HomeModule } from './home/home.module';
var firebaseConfig = {
  apiKey: "AIzaSyD8mKsQbp23hTs3aEkxfruuQniocLkui_Y",
  authDomain: "angular-chat-fb6eb.firebaseapp.com",
  databaseURL: "https://angular-chat-fb6eb-default-rtdb.firebaseio.com",
  projectId: "angular-chat-fb6eb",
  storageBucket: "angular-chat-fb6eb.appspot.com",
  messagingSenderId: "497606347783",
  appId: "1:497606347783:web:e7316d3a10fd08ffc9eea2"
};

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NewModule,
    LoginModule,
    HomeModule,
    RegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
