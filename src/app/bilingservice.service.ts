import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Booking } from './models/booking';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BilingserviceService {
  url:string = " http://localhost:3000";

  constructor(private http:HttpClient,private router:Router){}

  gethotel()
  {
    return this.http.get<any>("http://localhost:3000/saveBookingDetails").pipe(map((res:any)=> {
      return res
    }))
  }

  gethotelById(id:number)
  {
    return this.http.get<any>("http://localhost:3000/saveBookingDetails/"+id);
 
  }

}
