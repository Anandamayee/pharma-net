import { CommonService } from 'src/Services/commonService';
import { ConfigServer } from './../../Services/configServer';
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
  showSpinner: boolean = false;
  sucessResponse: any;
  errorMessage;
  constructor(private fb: FormBuilder, private config: ConfigServer,private commonService: CommonService) { }
  
  ngOnInit(): void {
    this.userLogin=this.fb.group({
      companyCRN:['',[Validators.required]],
      password:['',[Validators.required]],
    });
  }
  onSubmit(formValue){
    this.config.loginCompany(formValue).subscribe(response => {
      if (response) {
        this.sucessResponse = response;
        this.showSpinner = false;
      }

    }, error => {
      console.error(error);
      this.showSpinner = false;
      if (error.status == 500) {
        if(error.error.error.message.includes('\n'))
        {this.errorMessage=error.error.error.message.split('\n')[1].split('Error:')[1];}
        else this.errorMessage=error.error.error.message
        this.commonService.raiseSnackBar(this.errorMessage)

      }
      else {
        this.errorMessage = error.message;
        this.commonService.raiseSnackBar(this.errorMessage)
      }
    });
  }
}
