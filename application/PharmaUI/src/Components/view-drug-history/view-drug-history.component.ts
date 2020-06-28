import { CommonService } from './../../Services/commonService';
import { ConfigServer } from './../../Services/configServer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-drug-history',
  templateUrl: './view-drug-history.component.html',
  styleUrls: ['./view-drug-history.component.scss']
})
export class ViewDrugHistoryComponent implements OnInit {

  drugDetails: FormGroup;
  showSpinner: boolean = false;
  sucessResponse: any;
  errorMessage;
  constructor(private fb: FormBuilder, private config: ConfigServer, private commonService: CommonService) { }

  ngOnInit(): void {
    this.drugDetails = this.fb.group({
      drugName: ['', [Validators.required]],
      serialNo: ['', [Validators.required]],
    });
  }
  onSubmit(formValue) {
    this.config.viewDrugHistory(formValue).subscribe(response => {
      if (response) {
        console.log(response);
        this.sucessResponse = response;
        this.showSpinner = false;
      }

    }, error => {
      console.error(error);
      this.showSpinner = false;
      if (error.status == 500) {
        this.errorMessage = error.error.error.message.split('\n')[1].split('Error:')[1];
        this.commonService.raiseSnackBar(this.errorMessage)

      }
      else {
        this.errorMessage = error.message;
        this.commonService.raiseSnackBar(this.errorMessage)
      }
    });
  }


}
