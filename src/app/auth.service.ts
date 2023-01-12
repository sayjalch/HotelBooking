import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword,authState,createUserWithEmailAndPassword, updateProfile, user } from '@angular/fire/auth';
import { from } from 'rxjs';
import { concatMap,switchMap } from 'rxjs';
import { pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser$ = authState(this.auth);
  constructor(private auth:Auth) { }

  login(email:any,password:any){
    return from(signInWithEmailAndPassword(this.auth,email,password));
  }

  signup(name:any,email:any,password:any){
     return from(createUserWithEmailAndPassword(this.auth,email, password)).pipe(switchMap(({user})=>updateProfile(user,{displayName:email})))
  }

  logout(){
    return from(this.auth.signOut());
  }
}
