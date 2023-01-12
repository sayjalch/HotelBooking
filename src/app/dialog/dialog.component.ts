import { Room } from '../models/room-form';
import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  description:string;
  roomName:string;
  
  bedImagesSlider = new Array();
  constructor(private DialogRef:DialogRef, @Inject(MAT_DIALOG_DATA) public editData:Room){
    this.description=editData.description;
    this.roomName=editData.roomName;
  
      this.bedImagesSlider=editData.bedImages.split(',');
    
    console.log(this.bedImagesSlider);
  }
}
