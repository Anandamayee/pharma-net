import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AddDrugComponent } from './add-drug/add-drug.component';
import { CreatePoComponent } from './create-po/create-po.component';
import { CreateShipmentComponent } from './create-shipment/create-shipment.component';
import { UpdateShipmentComponent } from './update-shipment/update-shipment.component';
import { RetailDrugComponent } from './retail-drug/retail-drug.component';
import { ViewDrugHistoryComponent } from './view-drug-history/view-drug-history.component';
import { ViewDrugDetailsComponent } from './view-drug-details/view-drug-details.component';
import { DashBoardComponent } from './dash-board/dash-board.component';


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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
