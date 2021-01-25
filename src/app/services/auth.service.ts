import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { User } from "./user";
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async login(email: string, password: string) {   
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }  

  async register(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password)
    
 
  }

  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  async currenetUser(){
    return await this.afAuth.currentUser;
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user')); 
    return  user  !==  null;
  }
}
