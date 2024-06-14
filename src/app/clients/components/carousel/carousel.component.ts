import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(0%)', opacity: 0 }),
        animate('10ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)', opacity: 1 }),
        animate('1000ms ease-in-out', style({ transform: 'translateX(0%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit, OnDestroy {

  images = [
    {
      link: '../../assets/aro1.jpg',
      alt: "Aro new born",
      prioridad: "primero",
      text: 'Aro New Born',
      buttonText: 'Conocer más',
      position: 'left'
    },
    {
      link: '../../assets/aro2.jpg',
      alt: "Aro new born",
      prioridad: "segundo",
      text: 'Aro New Born',
      buttonText: 'Comprar ahora',
      position: 'right'
    },
    {
      link: '../../assets/aro3.jpg',
      alt: "Aro new born",
      prioridad: "tercero",
      text: 'Aro New Born',
      buttonText: 'Consultenos',
      position: 'right'
    },
    {
      link: '../../assets/hamaca1.jpg',
      alt: "mi primera hamaca",
      prioridad: "segundo",
      text: 'Hamaca New Born',
      buttonText: 'Conozcala',
      position: 'left'
    },
    {
      link: '../../assets/hamaca2.jpg',
      alt: "mi primera hamaca",
      prioridad: "cuarto",
      text: 'Hamaca New Born',
      buttonText: 'no se xd',
      position: 'left'
    },
    {
      link: '../../assets/hamaca3.jpg',
      alt: "mi primera hamaca",
      prioridad: "primero",
      text: 'Hamaca New Born',
      buttonText: 'Learn More 1',
      position: 'right'
    }
  ];
  currentIndex = 0;
  previousIndex: number | null = null;
  interval: any;

  constructor() {}

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  prev(): void {
    this.resetAutoSlide();
    this.previousIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
  }

  next(): void {
    this.resetAutoSlide();
    this.previousIndex = this.currentIndex;
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
  }

  goToIndex(index: number): void {
    this.resetAutoSlide();
    this.previousIndex = this.currentIndex;
    this.currentIndex = index;
  }

  startAutoSlide(): void {
    this.interval = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
