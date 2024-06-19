import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/productInterface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,7,18];
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductsService){
    console.log(this.router.url);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    if (this.router.url === '/productos/props') {
      this.productService.getProps().subscribe(data => {
        this.products = data;
      });
    } else if (this.router.url === '/productos/fondos') {
      this.productService.getBackdrops().subscribe(data => {
        this.products = data;
      });
    } else {
      this.productService.getDecos().subscribe(data => {
        this.products = data;
      });
    }
  }

  // onClickProduct(product: number){
  //   this.router.navigate(['/productos', { queryParams: { queryParams: product } }])
  // }

}
