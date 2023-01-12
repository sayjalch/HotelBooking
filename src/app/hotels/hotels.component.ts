import { AppComponent } from './../app.component';
import { HotelPolicyComponent } from './../hotel-policy/hotel-policy.component';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hotel } from '../models/hotel-form';
import { CommonServiceService } from '../common-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {
  title = 'HotelBookingSystem';
  roomFormGroup:FormGroup;
  hotelLocation:string="";
  hotel:Hotel[]=[];

  constructor(public dialog: MatDialog,private _formBuilder:FormBuilder,private http:HttpClient,private cs:CommonServiceService)
  {
  
    this.cs.hotelLocation.subscribe(data=>{
      this.hotelLocation=JSON.parse(JSON.stringify(data).replace(/"\s+|\s+"/g,'"'))
      console.log("valueofLocation:"+this.hotelLocation);     
      })
  }
  finalHotel:Hotel[]=[];
  ngOnInit()
  {
      this.hotel=[]
      debugger;
      this.roomFormGroup=this._formBuilder.group({
        
      });
 
    debugger;
   
   if(this.hotelLocation=="")
   {
   
      this.cs.getAllHotelData().subscribe({
       next:(_hotel)=>{
        this.hotel=_hotel;
        this.finalHotel=this.hotel
      }
    });
    
   }
   else{
    this.finalHotel=[];
    this.cs.getAllHotelData().subscribe({
      next:(_hotel)=>{
        //this.hotel=_hotel.filter(x=>x.location.includes(this.hotelLocation));
        this.hotel=_hotel;
        debugger;
        this.finalHotel=[];
        for(let obj of this.hotel)
        {
          
          this.finalHotel=this.hotel.filter(x=>x.location.toLocaleLowerCase().includes(this.hotelLocation.toLocaleLowerCase()));
        }
      }
    });
   }
  
  }
 
  openDialog(element:any){

    const dialogRef=this.dialog.open(HotelPolicyComponent,{ width: '400px',
    data:element});
  }
  
}
