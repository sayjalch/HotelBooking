import { Injectable } from '@angular/core';
import { SignUpForm } from './models/signupform';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsrserviceService {

  constructor(private http:HttpClient) { }
  url: string = "http://localhost:3000";
  postdata(data:SignUpForm){
    return this.http.post<SignUpForm>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getAdmin():Observable<any> {
    return this.http.get<any>(this.url + "/AdminLogin")
  }
}
