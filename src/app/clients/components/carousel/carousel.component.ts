import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ImagesService } from 'src/app/services/images.service';

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
export class CarouselComponent {

  //TODO hacer que las imagenes vengan de un servicio
  images: any = [];
  currentIndex = 0;
  previousIndex: number | null = null;
  interval: any;

  constructor( private imageService: ImagesService) {}

  ngOnInit(): void {
    this.images = this.imageService.images;
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