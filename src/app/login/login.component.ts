import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder,private authsrvice: AuthService,private router:Router) { }

  ngOnInit(): void {
  
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  get formControls() { return this.loginForm.controls; }
  login(){   
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.authsrvice.login(this.loginForm.value.email,this.loginForm.value.password) 
    .then(res=>{
      console.log('success');
      this.router.navigate(['/home']);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('userUId',res.user.uid)
   }).catch(err => {
     console.log('Something went wrong:',err.message);
   });
    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value));
    
  }
}
