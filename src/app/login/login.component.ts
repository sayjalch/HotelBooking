import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { UsrserviceService } from '../usrservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginform = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });

constructor(public authService:AuthService,private router:Router, private toast: HotToastService,private usr:UsrserviceService){}

ngOnInit(): void {}

get email(){
  return this.loginform.get('email');
}

get password(){
  return this.loginform.get('password');
}

submit(){
  if(!this.loginform.valid){
    return;
  }

  const {email,password}= this.loginform.value;
  //const {password}= this.loginform.value;
  this.authService.login(email,password).pipe(
    this.toast.observe({
      //success: 'Logged in successfully',
      //loading: 'Logging in...',
      //error: `There was an error`,
    })
  ).subscribe(() => {
        this.router.navigate(['/home']);
  })
}

// adminLogin() {
//   this.usr.getAdmin().subscribe(res=>{
//    const user = res.find((a: any) => {
//      return a.emailid== this.loginform.value.email && a.password==this.loginform.value.password
//    });
//    if(user){
//    this.toast.success("Login Success");
//      // alert("Success");
//      this.loginform.reset();
//      this.router.navigate(['/admin']);
//    }
//    else{
//      alert("Enter valid username and password")
//      this.loginform.reset();
//    }
//   });
  
 
//  }



}
