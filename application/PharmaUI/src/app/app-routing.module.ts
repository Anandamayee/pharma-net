import { LoginComponent } from './../Components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from '../Components/user-registration/user-registration.component';
import { AddDrugComponent } from '../Components/add-drug/add-drug.component';
import { CreatePoComponent } from '../Components/create-po/create-po.component';
import { CreateShipmentComponent } from '../Components/create-shipment/create-shipment.component';
import { UpdateShipmentComponent } from '../Components/update-shipment/update-shipment.component';
import { RetailDrugComponent } from '../Components/retail-drug/retail-drug.component';
import { ViewDrugHistoryComponent } from '../Components/view-drug-history/view-drug-history.component';
import { ViewDrugDetailsComponent } from '../Components/view-drug-details/view-drug-details.component';
import { DashBoardComponent } from '../Components/dash-board/dash-board.component';


const routes: Routes = [
  {
    component: DashBoardComponent,
    path: "dashboard"
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    component: UserRegistrationComponent,
    path: 'userRegistration'
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: AddDrugComponent,
    path: 'addDrug'
  },
  {
    component: CreatePoComponent,
    path: 'createPO'
  },
  {
    component: CreateShipmentComponent,
    path: 'createShipment'
  },
  {
    component: UpdateShipmentComponent,
    path: 'updateShipment'
  },
  {
    component: RetailDrugComponent,
    path: 'retailDrug'
  },
  {
    component: ViewDrugHistoryComponent,
    path: 'viewDrugHistory'
  },
  {
    component: ViewDrugDetailsComponent,
    path: 'viewDrugDetails'
  },
  {
    component: DashBoardComponent,
    path: "**"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
