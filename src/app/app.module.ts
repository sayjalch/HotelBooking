import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//firebase
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HotToastModule } from '@ngneat/hot-toast';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AdminComponent } from './admin/admin.component';
import { RoomBookingComponent } from './room-booking/room-booking.component';
import { HotelPolicyComponent } from './hotel-policy/hotel-policy.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HotelsComponent } from './hotels/hotels.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { BillingComponent } from './billing/billing.component';
//import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    AdminComponent,
    RoomBookingComponent,
    HomeDashboardComponent,
    HotelPolicyComponent,
    DialogComponent,
    HotelsComponent,
    RoomsComponent,
    BillingComponent
    
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AsyncPipe,
    MatIconModule, 
    MatFormFieldModule ,
   NgImageSliderModule,
   MatDatepickerModule,
    ReactiveFormsModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), HotToastModule.forRoot()


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
