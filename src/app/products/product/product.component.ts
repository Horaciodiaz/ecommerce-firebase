import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  price: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  tags: string[];
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product = {
    name: 'Aro Newborn',
    price: 85000,
    description: 'Transforma tus sesiones de fotografía de recién nacidos con el elegante y versátil Aro Newborn de Atrezo Props. Diseñado específicamente para capturar la inocencia y belleza de los primeros días de vida, este aro ofrece un soporte seguro y cómodo para los pequeños.',
    images: ['../../../../assets/aro1.jpg', '../../../../assets/aro2.jpg', '../../../../assets/aro3.jpg'],
    colors: ['blanco', 'marron', 'otro'],
    sizes: ['Pequeño', 'Mediano'],
    tags: ['Elegante', 'Newborn', 'Versatil']
  };

  selectedImage: string = '';
  selectedColor: string = '';
  selectedSize: string = '';
  

  ngOnInit(): void {
    this.selectedImage = this.product.images[0];
    this.selectedColor = this.product.colors[0];
    this.selectedSize = this.product.sizes[0];
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  addToCart(): void {
    alert(`Added ${this.product.name} to the cart with color ${this.selectedColor} and size ${this.selectedSize}.`);
  }
}
