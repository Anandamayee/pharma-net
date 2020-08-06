import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  state('opened',style({ opacity: 1 })),
  state('closed',style({ opacity: 0,transform:'translateX(100%)'})),
  transition('closed=>opened', [
    animate('300ms ease-in-out')
  ])
]);


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[listAnimation]
  
})
export class AppComponent {
  title = 'PharmaUI';
  drawerClicked:boolean=false;
  routerList=[
    {routerLink :'/userRegistration', routerName:'Register Company'},
    {routerLink :'/addDrug', routerName:'Add a Drug'},
    {routerLink :'/createPO', routerName:'Create PO'},
    {routerLink :'/createShipment', routerName:'Create Shipment'},
    {routerLink :'/updateShipment', routerName:'Update Shipment'},
    {routerLink :'/retailDrug', routerName:'Retail'},
    {routerLink :'/viewDrugHistory', routerName:'View Drug History'},
    {routerLink :'/viewDrugDetails', routerName:'View Drug Details'}
  ];
  constructor(private router:Router){}
  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/dashboard']);
  }
}
