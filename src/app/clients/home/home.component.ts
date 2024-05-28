import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imagenes = [
    {
      link: '../../../assets/aro1.jpg',
      alt: "Aro new born color verde"
    },
    {
      link: '../../../assets/aro2.jpg',
      alt: "Aro new born color rosa"
    },
    {
      link: '../../../assets/aro3.jpg',
      alt: "Aro new born color amarillo"
    },
    {
      link: '../../../assets/hamaca1.jpg',
      alt: "mi primera hamaca color amarillo"
    },
    {
      link: '../../../assets/hamaca2.jpg',
      alt: "mi primera hamaca color rosa"
    },
    {
      link: '../../../assets/hamaca3.jpg',
      alt: "mi primera hamaca color azul"
    },
    
  ];
}
