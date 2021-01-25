import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';
import {ConfirmPassword} from './cofirm-password';
import {AuthService} from '../services/auth.service';
import {ApiService} from '../services/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted = false;
  userDetails={}
  constructor(private api:ApiService,private formBuilder: FormBuilder,private authsrvice: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: ConfirmPassword('password', 'confirmPassword')
    });
  }
  get formControls() { return this.registerForm.controls; }
  register(){   
    this.isSubmitted = true;
    
    if(this.registerForm.invalid){
      return;
    }
  
    
    
    this.authsrvice.register(this.registerForm.value.email,this.registerForm.value.password)
    .then(res=>{
      console.log(res.user.uid);
      this.userDetails = {      
        email: this.registerForm.value.email,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        uid: res.user.uid     
      };
      this.api.AddUserDetails(this.userDetails);
      this.router.navigate(['/login']);
      localStorage.setItem('user', JSON.stringify(res.user));
      console.log('success')
   });
   
    
  }
}
