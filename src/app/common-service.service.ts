import { Booking } from './models/booking';
import { Injectable } from '@angular/core';
import { Hotel } from './models/hotel-form';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Room } from './models/room-form';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  url:string="http://localhost:3000";
 
  public constructor(private http:HttpClient) {

   }
   getAllHotelData():Observable<Hotel[]>
   {
    return this.http.get<Hotel[]>(this.url+'/'+'hotels');
   }
   getAllCustomerData():Observable<Booking[]>
   {
    return this.http.get<Booking[]>(this.url+'/'+'saveBookingDetails');
   }
   getAllHotelDataByLocation(location:string):Observable<Hotel[]>
   {
    return this.http.get<Hotel[]>(this.url+'/'+'hotels/'+location);
   }
   getRooms():Observable<Room[]>
   {
    return this.http.get<Room[]>(this.url+"/rooms"); 
   }
   getHotelByID(id:number):Observable<Hotel>
   {
    return this.http.get<Hotel>(this.url+"/hotels/"+id); 
   }
   getRoomByID(id:number):Observable<Room>
   {
    return this.http.get<Room>(this.url+"/rooms/"+id); 
   }

   hotelLocation = new BehaviorSubject("");
   currentValue=this.hotelLocation.asObservable();
   public changeValue(value:string){

    this.hotelLocation.next(value);

  }
   //hotelLocation =new Subject();
   sethotelLocation(hotelName:string)
   {
  this.hotelLocation.next(hotelName); 
   }
}
