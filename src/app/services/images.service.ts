import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  images = [
    {
      link: '../../assets/aro1.jpg',
      alt: "Aro new born",
      text: 'Aro New Born',
      buttonText: 'Conocer más',
    },
    {
      link: '../../assets/aro2.jpg',
      alt: "Aro new born",
      text: 'Aro New Born',
      buttonText: 'Comprar ahora',
    },
    {
      link: '../../assets/aro3.jpg',
      alt: "Aro new born",
      text: 'Aro New Born',
      buttonText: 'Consultenos'
    },
    {
      link: '../../assets/hamaca1.jpg',
      alt: "mi primera hamaca",
      text: 'Hamaca New Born',
      buttonText: 'Conozcala'
    },
    {
      link: '../../assets/hamaca2.jpg',
      alt: "mi primera hamaca",
      text: 'Hamaca New Born',
      buttonText: 'no se xd'
    },
    {
      link: '../../assets/hamaca3.jpg',
      alt: "mi primera hamaca",
      text: 'Hamaca New Born',
      buttonText: 'Learn More 1'
    }
  ];
  constructor() { }
}
