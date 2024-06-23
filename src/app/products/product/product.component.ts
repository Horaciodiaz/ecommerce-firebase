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

  product!:  Prop | Backdrop | Decoration;

  selectedImage: string = '';
  selectedColor: string = '';
  selectedSize: string = '';
  productId: string = '';
  
  constructor(public router: Router, private productService: ProductsService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.loadProductDetails();
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.loadProductDetails();
      }
    });
  }

  loadProductDetails(): void {
    this.productService.getProduct(this.productId).subscribe(
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

  formatPrice(price: number): string {
    const formattedPrice = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    // Reemplaza 'US$' con '' y coloca '$' al principio
    return '$' + formattedPrice.replace('US$', '');
  }
}
