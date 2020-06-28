import { ConfigServer } from './../../Services/configServer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MustMatch } from 'src/Validators/mustMatch';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CommonService } from 'src/Services/commonService';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  companyRegistration:FormGroup;
  confirmPasswordHide:boolean=true;
  passwordHide:boolean=true;
  organisationRoles: string[];
  showSpinner:boolean=false;
  sucessResponse:any;
  errorMessage;
  
  constructor(private fb:FormBuilder,private config:ConfigServer,private commonService:CommonService) { }
  
  ngOnInit(): void {
    this.companyRegistration=this.fb.group({
      companyName:['',[Validators.required]],
      companyCRN:['',[Validators.required]],
      Location:['',[Validators.required]],
      organisationRole:['',[Validators.required]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
  });
  this.getRoles();
  }
  onSubmit(formValue){
      this.config.registerCompany(formValue).subscribe(response=>{
        console.log(response);
        if(response){
          this.sucessResponse=response;
          this.showSpinner=false;
        }
      }, error => { 
        this.showSpinner=false;
        if(error.status == 500){
          this.errorMessage=error.error.error.message.split('\n')[1].split('Error:')[1];
          this.commonService.raiseSnackBar(this.errorMessage)
          
        }
        else{
          this.errorMessage=error.message;
          this.commonService.raiseSnackBar(this.errorMessage)
        }


      });
  }
  getRoles(){
     this.organisationRoles=[
      "Manufacturer",
      "Distributor",
      "Retailer",
      "Transporter"
    ]
  }

 

}

