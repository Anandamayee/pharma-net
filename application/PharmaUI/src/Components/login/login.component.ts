import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin:FormGroup;
  passwordHide:boolean=true;
  constructor(private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.userLogin=this.fb.group({
      companyCRN:['',[Validators.required]],
      password:['',[Validators.required]],
    });
  }
  onSubmit(formValue){

  }
}
