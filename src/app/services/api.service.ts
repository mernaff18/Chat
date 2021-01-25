import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(public  router:  Router,private firestore: AngularFirestore) { 
    
  }


  AddUserDetails(userdetails) {
    return new Promise<any>((resolve, reject) => {
        this.firestore.collection("userdetails").add(userdetails)
        .then(res => {
        resolve(res);
        }, err => reject(err));
        });
 }
 GetUserList() {
    return this.firestore.collection("userdetails").snapshotChanges();
 }
 GetDUser(id: string) {    
    return this.firestore.collection("userdetails").doc(id).snapshotChanges();
 }

 updateUser(id,value){
     return this.firestore.collection("userdetails").doc(id).update({messages:value})
 }

 AddMessage(messageDetails) {
  return new Promise<any>((resolve, reject) => {
      this.firestore.collection("messageDetails").add(messageDetails)
      .then(res => {
      resolve(res);
      }, err => reject(err));
      });
 }

 GetMessageList() {
  return this.firestore.collection("messageDetails").snapshotChanges();
 }
}
