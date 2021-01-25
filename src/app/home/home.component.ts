import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msgForm: FormGroup;
  searchText;
  allMessage: any[] = [];
  allUserDetails: any[] = [];
  chatWith;
  loggedUser;
  allUser: any[] = [];
  messagesList;
  usersList;
  messageTxt;
  senderUId;
  receiverUId;
  messageData = {

  };
  showMessage = [];




  constructor(private formBuilder: FormBuilder, private api: ApiService, private authsrvice: AuthService) {

  }



  ngOnInit() {
    this.msgForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
    this.fetchallMessage();
    this.getAllUsers();
    this.allMessage = [
      {
        "msg": "hi how are you",
        "time": "8.20 AM, Today",
        "msgtype": "outgoing",
        "img": "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
      },
      {
        "msg": "i'm fine hi how are you",
        "time": "8.20 AM, Today",
        "msgtype": "incoming",
        "img": "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
      },
      {
        "msg": "hi how are you",
        "time": "8.20 AM, Today",
        "msgtype": "outgoing",
        "img": "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
      },
      {
        "msg": "hi how are you",
        "time": "8.20 AM, Today",
        "msgtype": "incoming",
        "img": "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
      },
      {
        "msg": "hi how are you",
        "time": "8.20 AM, Today",
        "msgtype": "outgoing",
        "img": "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
      },
      {
        "msg": "hi how are you",
        "time": "8.20 AM, Today",
        "msgtype": "incoming",
        "img": "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
      }
    ]

  }

  fetchallMessage() {
    this.api.GetMessageList().subscribe(data => {
      this.messagesList = [];
      data.forEach((doc) => {
        this.messagesList.push({
          id: doc.payload.doc.id,
          message: doc.payload.doc.data()['message'],
          senderUId: doc.payload.doc.data()['senderUId'],
          receiverUId: doc.payload.doc.data()['receiverUId']
        })
      });
     console.log(this.messagesList)
    })
  }
  getAllUsers() {
    var user = localStorage.getItem('userUId');
    this.api.GetUserList().subscribe(data => {
      this.allUser = [];
      data.forEach((doc) => {
        this.allUser.push({
          id: doc.payload.doc.id,
          lastName: doc.payload.doc.data()['lastName'],
          firstName: doc.payload.doc.data()['firstName'],
          email: doc.payload.doc.data()['email'],
          uid: doc.payload.doc.data()['uid']
        })
      });
      this.allUserDetails = this.allUser.filter(res => res.uid != user);
      this.loggedUser = this.allUser.find(res => res.uid == user);
      this.senderUId = this.loggedUser.uid;
      this.getUser(this.allUserDetails[0].id);
    })
  }

  getUser(id) {
    this.api.GetDUser(id).subscribe(data => {
      this.chatWith = data.payload.data()['firstName'];
      this.receiverUId = data.payload.data()['uid'];
      this.fetchSelectedMsg(this.receiverUId);

    });
    console.log(this.receiverUId);


  }

  fetchSelectedMsg(rid) {
    console.log(this.messagesList);
    this.showMessage = this.messagesList.filter(data => data.receiverUId == rid);
    console.log(this.showMessage)
  }

  submitMsg() {
    this.messageData = {};
    this.messageData = {
      message: this.msgForm.value.message,
      senderUId: this.senderUId,
      receiverUId: this.receiverUId
    }

   this.api.AddMessage(this.messageData);
   this.fetchallMessage();
  //  this.fetchSelectedMsg(this.receiverUId);
    this.msgForm.reset();
    Object.keys(this.msgForm.controls).forEach(key => {
      this.msgForm.controls[key].setErrors(null)
    });
  }



}
