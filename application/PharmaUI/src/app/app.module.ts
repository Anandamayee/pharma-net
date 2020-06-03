import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AddDrugComponent } from './add-drug/add-drug.component';
import { CreatePoComponent } from './create-po/create-po.component';
import { CreateShipmentComponent } from './create-shipment/create-shipment.component';
import { UpdateShipmentComponent } from './update-shipment/update-shipment.component';
import { RetailDrugComponent } from './retail-drug/retail-drug.component';
import { ViewDrugHistoryComponent } from './view-drug-history/view-drug-history.component';
import { ViewDrugDetailsComponent } from './view-drug-details/view-drug-details.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    AddDrugComponent,
    CreatePoComponent,
    CreateShipmentComponent,
    UpdateShipmentComponent,
    RetailDrugComponent,
    ViewDrugHistoryComponent,
    ViewDrugDetailsComponent,
    DashBoardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
