import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Backdrop, Decoration, Prop } from '../interfaces/productInterface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent{

  product!:  Prop | Backdrop | Decoration
  //  = {
  //   name: 'Aro Newborn',
  //   price: 85000,
  //   description: 'Transforma tus sesiones de fotografía de recién nacidos con el elegante y versátil Aro Newborn de Atrezo Props. Diseñado específicamente para capturar la inocencia y belleza de los primeros días de vida, este aro ofrece un soporte seguro y cómodo para los pequeños.',
  //   images: ['../../../../assets/aro1.jpg', '../../../../assets/aro2.jpg', '../../../../assets/aro3.jpg'],
  //   colors: ['blanco', 'marron', 'otro'],
  //   sizes: ['Pequeño', 'Mediano'],
  //   tags: ['Elegante', 'Newborn', 'Versatil']
  // };

  selectedImage: string = '';
  selectedColor: string = '';
  selectedSize: string = '';
  productID: string = '';
  
  constructor(public router: Router, private productService: ProductsService, private route: ActivatedRoute){
    route.params.subscribe( Param => {
      this.productID = Param['id'];
    })
  }

  ngOnInit(): void {
    this.loadProductDetails();
  }
  loadProductDetails(): void {
    this.productService.getProduct(this.productID).subscribe(
      (product: Prop | Decoration | Backdrop) => {
        this.product = product;
        this.selectedImage = product.images[0];
      },
      (error) => {
        console.error(error); // Maneja el error de producto no encontrado
      }
    );
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

//   adjustImagePath(imagePath: string): string {
//     // Asumiendo que la ruta imagePath tiene el formato "../../../../assets/aro2.jpg"
//     // Dividimos la ruta por '/'
//     let parts = imagePath.split('/');
    
//     // Eliminamos un nivel de '../' del inicio del array
//     parts = parts.filter(part => part !== '..');
    
//     // Unimos nuevamente las partes con '/'
//     let adjustedPath = parts.join('/');
    
//     return adjustedPath;
// }

  // addToCart(): void {
  //   alert(`Added ${this.product.name} to the cart with color ${this.selectedColor} and size ${this.selectedSize}.`);
  // }
}
