import { Component } from '@angular/core';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any = [];

  constructor(private productsService: ProductsService){}

  ngOnInit(){
    // this.productsService.getProps().subscribe(data => {
    //   this.products = data;
    // });;
  }

  addProduct() {
    // Función para agregar un producto
  }

  editProduct(product: any) {
    // Función para editar un producto
  }

  deleteProduct(id: number) {
    // Función para eliminar un producto
  }
}
