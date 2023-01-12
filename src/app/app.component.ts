import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='HotelBooking'
constructor(public authService:AuthService,private router: Router){}
 
logout(){
  this.authService.logout().subscribe(() => {
    this.router.navigate([]);
  });
 }

}
