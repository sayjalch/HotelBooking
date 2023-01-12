import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


import { Booking } from './models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(public http:HttpClient) { }
  url:string="http://localhost:3000";
  
  saveBooking(book:Booking)
  {
      return this.http.post<Booking>(this.url+"/saveBookingDetails",book);
  }

}
