import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-hotel-policy',
  templateUrl: './hotel-policy.component.html',
  styleUrls: ['./hotel-policy.component.css']
})
export class HotelPolicyComponent {
policyDescription:string;
  constructor(private DialogRef:DialogRef, @Inject(MAT_DIALOG_DATA) public _policyDescripton:any){
    this.policyDescription=_policyDescripton
  }
}
