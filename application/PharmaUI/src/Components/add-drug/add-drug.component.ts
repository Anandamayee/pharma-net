import { CommonService } from 'src/Services/commonService';
import { ConfigServer } from './../../Services/configServer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateValidate } from 'src/Validators/DateValidator';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-drug',
  templateUrl: './add-drug.component.html',
  styleUrls: ['./add-drug.component.scss']
})
export class AddDrugComponent implements OnInit {

  drugRegistration: FormGroup;
  companyCRNs: string[] = [];
  filteredCRNS: Observable<string[]>;
  showSpinner: boolean = false;
  sucessResponse: any;
  errorMessage;

  constructor(private fb: FormBuilder, private config: ConfigServer, private commonService: CommonService) { }

  ngOnInit(): void {
    this.drugRegistration = this.fb.group({
      drugName: ['', [Validators.required]],
      serialNo: ['', [Validators.required]],
      mfgDate: ['', [Validators.required]],
      expDate: ['', [Validators.required]],
      companyCRN: ['', [Validators.required]],
    },
      {
        validator: DateValidate('mfgDate', 'expDate')
      });
    this.getCompanyCRNs();
  }
  onSubmit(formValue) {
    this.config.addDrug(formValue).subscribe(response => {
      if (response) {
        this.sucessResponse = response;
        this.showSpinner = false;
      }

    }, error => {
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

  getCompanyCRNs() {
    this.config.getRegisteredCompanyCRN().subscribe(response => {
      console.log(response);
      this.showSpinner = false;
      this.companyCRNs = response['users'];
      this.filteredCRNS = this.drugRegistration.controls.companyCRN.valueChanges.
        pipe(
          startWith(''),
          map(value => this._filter(value))
        )

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

    }
    )

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.companyCRNs.filter(option => { if (option) return option.toLowerCase().includes(filterValue) });
  }

}
