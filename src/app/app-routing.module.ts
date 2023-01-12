import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { canActivate,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard';
import { AdminComponent } from './admin/admin.component';
import { HotelsComponent } from './hotels/hotels.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { RoomBookingComponent } from './room-booking/room-booking.component';

import { MatIcon } from '@angular/material/icon';
import { BillingComponent } from './billing/billing.component';
const redirectTologin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
// {
//   path:'login',
//   pathMatch:'full',
//   component:LoginComponent
// },
{
  path:'signup',
  component:SignupComponent
},
// {
//   path:'home',
//   component: HomeComponent,
//   ...canActivate(redirectTologin),
  
// },
{
  path:"login",component:LoginComponent
},
{
  path:'admin',
  component:AdminComponent
},
{
  path:'dashboard',
  component:DashboardComponent
},
{path:"hotels",component:HotelsComponent},
  {path:"rooms/:id",component:RoomsComponent},
  {path:"home",component:HomeDashboardComponent,...canActivate(redirectTologin)},
  {path:"booking/:id",component:RoomBookingComponent},
  {path:"billing",component:BillingComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
