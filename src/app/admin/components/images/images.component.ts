import { Component } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent {
  images: any = [];

  constructor( private imagesService: ImagesService){}

  ngOnInit(){
    this.images = this.imagesService.images;
  }

  addProduct() {
    // Función para agregar un producto
  }

  changeImage(image: any) {
    // Función para editar un producto
    alert("cambiar imagen")
  }

  deleteImage(id: number) {
    // Función para eliminar un producto
    alert("eliminar imagen")
  }
}
