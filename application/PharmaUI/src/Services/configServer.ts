import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
    providedIn:'root'
})
export class ConfigServer{
    private REST_API_SERVER = "http://localhost:3000";
    constructor(private httpClient:HttpClient){}
    private handleError(error:HttpErrorResponse){
        console.error(error);
        return throwError(error)
    }

    public getRegisteredCompanyCRN(){
        return this.httpClient.get(`${this.REST_API_SERVER}/getRegisteredCompanyCRN`).pipe(catchError(this.handleError));
    }
    public registerCompany(companyInfo){
        return this.httpClient.post(`${this.REST_API_SERVER}/registerCompany`,companyInfo).pipe(catchError(this.handleError));
    }
    public addDrug(drugInfo){
        return this.httpClient.post(`${this.REST_API_SERVER}/addDrug`,drugInfo).pipe(catchError(this.handleError));
    }
    public createPO(orderInfo){
        return this.httpClient.post(`${this.REST_API_SERVER}/createPO`,orderInfo).pipe(catchError(this.handleError));
    }
    public createShipment(shipmentInfo){
        return this.httpClient.post(`${this.REST_API_SERVER}/createShipment`,shipmentInfo).pipe(catchError(this.handleError));
    }
    public updateShipment(shipmentInfo){
        return this.httpClient.put(`${this.REST_API_SERVER}/updateShipment`,shipmentInfo).pipe(catchError(this.handleError));
    }
    public retailDrug(shipmentInfo){
        return this.httpClient.post(`${this.REST_API_SERVER}/retailDrug`,shipmentInfo).pipe(catchError(this.handleError));
    }
    public viewDrugHistory(drugInfo){
        return this.httpClient.get(`${this.REST_API_SERVER}/viewDrugHistory`,{params:drugInfo}).pipe(catchError(this.handleError));
    }
    public viewDrugDetails(drugInfo){
        return this.httpClient.get(`${this.REST_API_SERVER}/viewDrugDetails`,{params:drugInfo}).pipe(catchError(this.handleError));
    }
}