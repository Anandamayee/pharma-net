import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from '../Components/user-registration/user-registration.component';
import { AddDrugComponent } from '../Components/add-drug/add-drug.component';
import { CreatePoComponent } from '../Components/create-po/create-po.component';
import { CreateShipmentComponent } from '../Components/create-shipment/create-shipment.component';
import { UpdateShipmentComponent } from '../Components/update-shipment/update-shipment.component';
import { RetailDrugComponent } from '../Components/retail-drug/retail-drug.component';
import { ViewDrugHistoryComponent } from '../Components/view-drug-history/view-drug-history.component';
import { ViewDrugDetailsComponent } from '../Components/view-drug-details/view-drug-details.component';
import { DashBoardComponent } from '../Components/dash-board/dash-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import { LoginComponent } from '../Components/login/login.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';

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
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTabsModule,
    CarouselModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    HttpClientModule

  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
