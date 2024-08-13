import { Component } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
type Category = 'props' | 'decos' | 'fondos';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent {
  newImage = { title: '', subtitle: '', category: 'props', file: null };
  images: any[] = [];

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  // Cargar todas las imágenes desde Firestore
  loadImages(): void {
    this.imagesService.getAllPromotionalImages().then(images => {
      this.images = images;
      console.log(images)
    });
  }

  // Manejar la selección de archivos
  onFileSelected(event: any): void {
    this.newImage.file = event.target.files[0];
  }

  // Subir una nueva imagen
  onSubmit(): void {
    if (this.newImage.file) {
      this.imagesService.uploadPromotionalImage(this.newImage.file, this.newImage.title, this.newImage.subtitle, this.newImage.category as Category)
        .then(() => this.loadImages());
    }
  }

  // Editar una imagen (puedes expandir esto para abrir un formulario de edición)
  editImage(image: any): void {
    console.log('Editar imagen:', image);
    // Aquí puedes implementar la lógica para editar la imagen
  }

  // Eliminar una imagen
  deleteImage(image: any): void {
    this.imagesService.deletePromotionalImage(image.imageName, image.category)
      .then(() => this.loadImages());
  }
}
