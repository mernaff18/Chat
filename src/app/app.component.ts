import { Component,OnInit,DoCheck } from '@angular/core';
import {AuthService} from './services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,DoCheck{
  title = 'Royce';
  isLoggedin:boolean = false;
  constructor(private authsrvice: AuthService,private router:Router) { }
  ngOnInit(): void {
        this.isLoggedin = this.authsrvice.isLoggedIn;
  }
  ngDoCheck(){
    this.isLoggedin = this.authsrvice.isLoggedIn;
  }
  logout(){
     this.authsrvice.logout()
  }
}
