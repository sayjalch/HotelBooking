import { DialogComponent } from './../dialog/dialog.component';
import { Room } from '../models/room-form';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Hotel } from '../models/hotel-form';
import { CommonServiceService } from '../common-service.service';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  
})
export class RoomsComponent {
  roomFormGroup:FormGroup;
  i=0;
  hotelName:string;
  location:string;
  panelOpenState = false;
  
  constructor(private http:HttpClient,private _router: Router, private _route: ActivatedRoute,private cs:CommonServiceService,  private router: Router,public dialog: MatDialog)
  {
    //const snapshot: RouterStateSnapshot = router.routerState.snapshot;
   // console.log(snapshot); 

  }
  rooms:Room[]=[];//{id:0,roomName:'',image:'',hotelId:0,location:'',roomType:'',description:''};
  hotel:Hotel={id:0,hotelName:'',location:'',image:'',rate:0,policyDescription:''}
  hotelId:number=0;
  finalRooms:Room[]=[];
  param:string;
  tooltip:string;
  ngOnInit()
  { 
    this._route.paramMap.subscribe(param => {
      
      this.hotelId = JSON.parse(param.get('id')|| '{}');
      console.log(this.hotelId );
    });
    this.cs.getHotelByID(this.hotelId).subscribe((data)=>{
      this.hotel=data;
      this.hotelName=this.hotel.hotelName
      this.location=this.hotel.location;
      this.tooltip=this.hotelName+" "+this.location
      console.log(this.hotelName)
      })

      this.cs.getRooms().subscribe({
        next:(_rooms)=>{
          this.rooms=_rooms;
          for(let a of this.rooms)
          {
            if(a.hotelId==this.hotelId )
            {
              this.finalRooms.push(a);
            }
          }
          console.log(this.rooms)
        }
      });
  }
  openDialog(element:any){

    const dialogRef=this.dialog.open(DialogComponent,{ width: '900px',

        data:element});

      //console.log(id);

  }
//   openDialog() {

//     this.dialog.open(contact,{

//       width: '800px',

//       height:'600px',
//       //data:1

//     });

//   }
// }
// @Component({

//   selector: 'contact',

//   templateUrl: 'contact.html',

// })
//export class contact 
}