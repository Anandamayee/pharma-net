import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
    providedIn:'root'
})

export class CommonService{

    constructor(public snackBar:MatSnackBar){}

    raiseSnackBar(errorMessage){
        this.snackBar.open(errorMessage,'Dismiss',{
            duration:5000,
            horizontalPosition:"center",
            verticalPosition:"top",
            panelClass:["snackBarCustom"]
        })
    }

}