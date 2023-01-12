import { Component ,OnInit} from '@angular/core';
import { FormControl,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { UsrserviceService } from '../usrservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  adminform = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });
constructor(private router:Router, private toast: HotToastService,private usr:UsrserviceService){}
ngOnInit(): void {}

adminLogin() {
  this.usr.getAdmin().subscribe(res=>{
   const user = res.find((a: any) => {
     return a.emailid== this.adminform.value.email && a.password==this.adminform.value.password
   });
   if(user){
   this.toast.success("Login Success");
     // alert("Success");
     this.adminform.reset();
     this.router.navigate(['/dashboard']);
   }
   else{
     alert("Enter valid username and password")
     this.adminform.reset();
   }
  });
  
 
 }

}
