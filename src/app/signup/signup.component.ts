import { Component ,OnInit} from '@angular/core';
import { FormControl,Validators,FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';
import { UsrserviceService } from '../usrservice.service';
import { SignUpForm } from '../models/signupform';

export function passwordMatchVaidator():ValidatorFn{
  return (control:AbstractControl): ValidationErrors | any =>{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true }
    } 
    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userobj:SignUpForm= new SignUpForm();   //register into db.json
  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('',[
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
    confirmPassword : new FormControl('',Validators.required),
    mobile_number : new FormControl(0,Validators.required),
    birthdate:new FormControl('',Validators.required)
  }, {validators:passwordMatchVaidator() })

constructor(private authService:AuthService,private toast: HotToastService,private router: Router,private userService:UsrserviceService){}

ngOnInit(): void {}

get email() {
  return this.signUpForm.get('email');
}

get password() {
  return this.signUpForm.get('password');
}

get confirmPassword() {
  return this.signUpForm.get('confirmPassword');
}

get name() {
  return this.signUpForm.get('name');
}

get mobilenumber(){
  return this.signUpForm.get('mobilenumber');
}

get birthdate(){
  return this.signUpForm.get('birthdate');
}

signupsubmit(){
 
 // debugger;
//if (!this.signUpForm.valid) return;
  
    const { name, email, password } = this.signUpForm.value;
     
    
  
    this.authService.signup(name,email, password)
      .pipe(
          this.toast.observe({
         // success: 'Congrats! You are all signed up',
          //loading: 'Signing up...',
         
          error: (err) => `${err?.message}`,
        })
      )
      .subscribe(() => {
        //this.router.navigate(['/home']);
      })
      this.router.navigate(['/login']);
}

storedata(){
this.userobj.fullname=this.signUpForm.value.name;
this.userobj.emailid=this.signUpForm.value.email;
this.userobj.password=this.signUpForm.value.password;
this.userobj.mobileno=this.signUpForm.value.mobile_number;
this.userobj.dateofbirth=this.signUpForm.value.birthdate;

this.userService.postdata(this.userobj).subscribe();
      }   

}
