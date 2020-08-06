import { CommonService } from './../../Services/commonService';
import { ConfigServer } from './../../Services/configServer';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateValidate } from 'src/Validators/DateValidator';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-retail-drug',
  templateUrl: './retail-drug.component.html',
  styleUrls: ['./retail-drug.component.scss']
})
export class RetailDrugComponent implements OnInit {

  retailDrug: FormGroup;
  companyCRNs: string[] = [];
  filteredCRNS: Observable<string[]>;
  showSpinner: boolean = false;
  sucessResponse: any;
  errorMessage;


  constructor(private fb: FormBuilder, private config: ConfigServer, private commonService: CommonService) { }

  ngOnInit(): void {
    this.retailDrug = this.fb.group({
      drugName: ['', [Validators.required]],
      serialNo: ['', [Validators.required]],
      customerAadhar: ['', [Validators.required]],
      sellerCRN: ['', [Validators.required]],
    });
    this.getCompanyCRNs();
  }
  onSubmit(formValue) {
    this.config.retailDrug(formValue).subscribe(response => {
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

  getCompanyCRNs() {
    this.config.getRegisteredCompanyCRN().subscribe(response => {
      console.log(response);
      this.showSpinner = false;
      this.companyCRNs = response['users'];
      this.filteredCRNS = this.retailDrug.controls.companyCRN.valueChanges.
        pipe(
          startWith(''),
          map(value => this._filter(value))
        )

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

    }
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.companyCRNs.filter(option => option.toLowerCase().includes(filterValue));
  }

}
