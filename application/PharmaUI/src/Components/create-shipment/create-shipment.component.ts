import { CommonService } from 'src/Services/commonService';
import { ConfigServer } from './../../Services/configServer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.scss']
})
export class CreateShipmentComponent implements OnInit {

  createShipment: FormGroup;
  companyCRNs: string[] = [];
  filteredtransporterCRNS: Observable<string[]>;
  filteredBuyerCRNS: Observable<string[]>;
  showSpinner: boolean = false;
  sucessResponse: any;
  errorMessage;


  constructor(private fb: FormBuilder, private config: ConfigServer, private commonService: CommonService) { }

  ngOnInit(): void {
    this.createShipment = this.fb.group({
      drugName: ['', [Validators.required]],
      buyerCRN: ['', [Validators.required]],
      transporterCRN: ['', [Validators.required]],
      assestsList: this.fb.array([this.fb.control('')], [Validators.minLength(1)]),
    });
    this.getCompanyCRNs();
  }
  onSubmit(formValue) {
    this.createShipment.addControl('listOfAssets',this.fb.control(''))
    this.createShipment.controls['listOfAssets'].setValue(this.assestsList.value.join(','));
    formValue=this.createShipment.value;
    this.config.createShipment(formValue).subscribe(response => {
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
      this.companyCRNs = response['users'];
      this.filteredBuyerCRNS = this.createShipment.controls.buyerCRN.valueChanges.
        pipe(
          startWith(''),
          map(value => this._filter(value))
        )
      this.filteredtransporterCRNS = this.createShipment.controls.transporterCRN.valueChanges.
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
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.companyCRNs.filter(option => option.toLowerCase().includes(filterValue));
  }
  get assestsList() {
    return this.createShipment.get('assestsList') as FormArray;
  }

  addToListOfAssests() {
    this.assestsList.push(this.fb.control(''));
  }
  removeFromListOfAssests(index) {
    this.assestsList.removeAt(index);
  }

}
