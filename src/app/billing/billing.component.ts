import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { BilingserviceService } from '../bilingservice.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../models/hotel-form';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  Id:string|undefined|null;
  @ViewChild('content',{static:false})el!:ElementRef;

  hotel:Array<any>=[];
  http: any;
  constructor(private bilingservice:BilingserviceService, private activatedRoute:ActivatedRoute,http:HttpClient,private formBuilder:FormBuilder,private snackbar:MatSnackBar){}
  
  formValue!: FormGroup; 
  data:any;
  bookingId:any;
  ngOnInit(): void {
    
    this.formValue = this.formBuilder.group({
      bookingId:[''],
      hotelName:[''],

    
    })
   this.getHotel();
   //gethotelById();
  }
  
  url:string = " http://localhost:3000/saveBookingDetails";
  
  getHotel(){
  this.bilingservice.gethotel().subscribe({
    next:(pre)=>{
      pre.forEach((element:any) => {
        if(element.bookingId==1){
          console.log(element);
          this.hotel.push(element);
        }
      })
this.snackbar.open("Thank you For Booking","OK",{
  duration:3000
})
  },})


// this.id = this.activatedRoute.snapshot.params['id'];
// this.gethotelById();

}
gethotelById(){
  this.bilingservice.gethotelById(this.bookingId).subscribe(data=>{
    this.data=data;
    console.log(data)
  })
}

getName(name:string){
  alert(name)
}


  // makePDF(){
  //   let pdf = new jsPDF('p','pt','a4');
  //   pdf.html(this.el.nativeElement,{
  //     callback:(pdf)=>{
  //       pdf.save("demo.pdf");
  //     }
  //   });

    
    
}







