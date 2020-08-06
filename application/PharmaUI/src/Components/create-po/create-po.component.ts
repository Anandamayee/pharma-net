import { CommonService } from 'src/Services/commonService';
import { ConfigServer } from './../../Services/configServer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateValidate } from 'src/Validators/DateValidator';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-po',
  templateUrl: './create-po.component.html',
  styleUrls: ['./create-po.component.scss']
})
export class CreatePoComponent implements OnInit {

  createPO: FormGroup;
  companyCRNs: string[] = [];
  filteredSellerCRNS: Observable<string[]>;
  filteredBuyerCRNS: Observable<string[]>;
  showSpinner: boolean = false;
  sucessResponse: any;
  errorMessage;

  constructor(private fb: FormBuilder, private config: ConfigServer, private commonService: CommonService) { }

  ngOnInit(): void {
    this.createPO = this.fb.group({
      drugName: ['', [Validators.required]],
      buyerCRN: ['', [Validators.required]],
      sellerCRN: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
    this.getCompanyCRNs();
  }
  onSubmit(formValue) {
    this.config.createPO(formValue).subscribe(response => {
      if (response) {
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

  getCompanyCRNs() {
    this.config.getRegisteredCompanyCRN().subscribe(response => {
      console.log(response);
      this.companyCRNs = response['users'];
      this.filteredBuyerCRNS = this.createPO.controls.buyerCRN.valueChanges.
        pipe(
          startWith(''),
          map(value => this._filter(value))
        )
      this.filteredSellerCRNS = this.createPO.controls.sellerCRN.valueChanges.
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
    return this.companyCRNs.filter(option => option.toLowerCase().includes(filterValue));
  }

}
