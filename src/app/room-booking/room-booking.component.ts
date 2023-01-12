import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { Booking } from '../models/booking';
import { CommonServiceService } from '../common-service.service';
import { Room } from '../models/room-form';
import { Hotel } from '../models/hotel-form';
import { HotelsComponent } from '../hotels/hotels.component';
import { RoomsComponent } from '../rooms/rooms.component';

@Component({
  selector: 'app-room-booking',
  templateUrl: './room-booking.component.html',
  styleUrls: ['./room-booking.component.css']
})
export class RoomBookingComponent {

  book = new Booking();
  minDate = new Date();
  panelOpenState = true;
  bookingForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private _route: ActivatedRoute, public b: BookingService, public cs: CommonServiceService, public datepipe: DatePipe) {
  }

  bookingFormConfirm = this.fb.group({
  });

  rooms:Room;
  hotel:Hotel;
  hotelId:number=0;
  roomId:number=0;
  finalRooms:Room[]=[];
  param:string;
  tooltip:string;

  ngOnInit() {

    this._route.paramMap.subscribe(param => {
      
      this.roomId = JSON.parse(param.get('id')|| '{}');
    });
    this.cs.getRoomByID(this.roomId).subscribe((data)=>{
      this.rooms=data;
      this.hotelId=data.hotelId;
      
      this.bookingForm.controls['roomName'].setValue(data.roomName);
      this.bookingForm.controls['roomType'].setValue(data.roomType);
      this.bookingForm.controls['roomNo'].setValue(data.id);
      this.bookingForm.controls['price'].setValue(data.price);
      
      this.book.roomName = data.roomName;
      this.book.roomType= data.roomType;
      this.book.price = data.price;

      this.cs.getHotelByID(data.hotelId).subscribe((data)=>{
        this.hotel=data;
        this.bookingForm.controls['hotelName'].setValue(data.hotelName);
        this.book.hotelName = data.hotelName;
        })

      })

    this.createForms();
    this.bookingForm = new FormGroup({
      fullname: new FormControl('', Validators.compose([
        Validators.maxLength(32),
        Validators.minLength(6),
        Validators.required
      ])),
      dateofbirth: new FormControl(['', Validators.required]),
      gender: new FormControl(this.genders[0], Validators.required),
      mobileno: new FormControl(['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]),
      emailid: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      address1:new FormControl(['', Validators.required]),
      address2:new FormControl(['']),
      city:new FormControl(['', Validators.required]),
      pincode:new FormControl(['', Validators.required]),
      state:new FormControl(['', Validators.required]),
      country:new FormControl(['', Validators.required]),
      hotelName:new FormControl(['']),
      roomName:new FormControl(['']),
      roomType:new FormControl(['']),
      checkIn:new FormControl(['', Validators.required]),
      checkOut:new FormControl(['', Validators.required]),
      roomNo:new FormControl(['']),
      adults:new FormControl(['', Validators.required]),
      child:new FormControl(['', Validators.required]),
      price:new FormControl(['']),
    });
  }

  genders = [
    'Male',
    'Female'
  ];

  adults = [
    '1',
    '2',
    '3',
    '4',
    '5'
  ];

  childs = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5'
  ];

  countries = [
    'India',
    'United Kingdom',
    'Canada',
    'Australia',
    'France',
    'Spain',
    'Brazil',
    'Bhutan',
    'Bangladesh'
  ];

  validation_messages = {
    'fullname': [
      { type: 'required', message: 'Full name is required' },
      { type: 'minlength', message: 'Full name must be at least 6 characters long' },
      { type: 'maxlength', message: 'Full name cannot be more than 32 characters long' }
    ],
    'gender': [
      { type: 'required', message: 'Please select your gender' }
    ],
    'dateofbirth': [
      { type: 'required', message: 'Please select your birthday' }
    ],
    'mobileno': [
      { type: 'required', message: 'Mobile no is required' },
      { type: 'maxlength', message: 'Mobile no should be 10 digits long' }
    ],
    'emailid': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid mail' }
    ],
    'address1': [{ type: 'required', message: 'Address is required' }],
    'address2': [],
    'city': [{ type: 'required', message: 'City is required' }],
    'pincode': [{ type: 'required', message: 'Zip/Post Code is required' }],
    'state': [{ type: 'required', message: 'State/Region is required' }],
    'country': [{ type: 'required', message: 'Country is required' }],
    'hotelName': [],
    'roomName': [],
    'roomType': [],
    'checkIn': [{ type: 'required', message: 'Check In is required' }],
    'checkOut': [{ type: 'required', message: 'Check Out is required' }],
    'roomNo': [],
    'adults': [{ type: 'required', message: 'No of Adults is required' }],
    'child': [{ type: 'required', message: 'No of Child is required' }],
    'price': [],
  };

  createForms() {
    // country & phone validation_messages
    let country = new FormControl(this.countries[0], Validators.required);
    
  }

  onSubmitBookingDetails(bookingValue:any) {
    if (this.bookingForm.valid) {
      // To calculate the time difference of two dates
      var Difference_In_Time = bookingValue.checkOut.getTime() - bookingValue.checkIn.getTime();

      // To calculate the no. of days between two dates
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      bookingValue.checkIn = this.datepipe.transform(bookingValue.checkIn, 'dd/MM/YYYY');
      bookingValue.checkOut = this.datepipe.transform(bookingValue.checkOut, 'dd/MM/YYYY');
      bookingValue.dateofbirth = this.datepipe.transform(bookingValue.dateofbirth, 'dd/MM/YYYY');
      bookingValue.noOfStayDays = Difference_In_Days;
      bookingValue.bookingStatus = "Booked";
      this.b.saveBooking(bookingValue).subscribe();
      alert('Booking Successfully');
      this.router.navigate(['/billing']);
    }
  }

}
