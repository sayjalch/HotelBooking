import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent {

  constructor(private cs:CommonServiceService,private Router:Router)
  {

  }

  hotelLocation:string;
  imageObject = [
    {
      image: '/assets/images/slide2.jpg',
      thumbImage: '/assets/images/slide2.jpg'
    },
    {
      image: '/assets/images/slide3.jpg',
      thumbImage: '/assets/images/slide3.jpg'
    },
    {
      image: '/assets/images/slide4.jpg',
      thumbImage: '/assets/images/slide4.jpg'
    },
    {
      image: '/assets/images/slide1.jpg',
      thumbImage: '/assets/images/slide1.jpg'
    }];


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

    onSearch(value:string)
    {
      this.cs.sethotelLocation(value);
      this.hotelLocation=value; 
      this.Router.navigate(['/hotels'])
    }

}
