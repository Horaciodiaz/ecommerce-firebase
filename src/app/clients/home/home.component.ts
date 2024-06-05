import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    {
      link: '../../../assets/aro1.jpg',
      alt: "Aro new born"
    },
    {
      link: '../../../assets/aro2.jpg',
      alt: "Aro new born"
    },
    {
      link: '../../../assets/aro3.jpg',
      alt: "Aro new born"
    },
    {
      link: '../../../assets/hamaca1.jpg',
      alt: "mi primera hamaca"
    },
    {
      link: '../../../assets/hamaca2.jpg',
      alt: "mi primera hamaca"
    },
    {
      link: '../../../assets/hamaca3.jpg',
      alt: "mi primera hamaca"
    }
  ];
}
