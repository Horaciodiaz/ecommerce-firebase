import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/productInterface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];
  category: string = 'props';
  subcategory: string = '';

  constructor(private router: Router ,private productService: ProductsService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.category = params['category'];
        return this.route.queryParams;
      })
    ).subscribe(queryParams => {
      let subcategory = queryParams['subcategory'] || '';

      if (subcategory === '') {
        this.loadProductsByCategory(this.category);
      } else {
        this.loadProductsBySubcategory(this.category, subcategory);
      }
    });
  }

  loadProductsByCategory(category: string) {
    switch (category) {
      case 'props':
        this.productService.getProps().subscribe(data => {
          this.products = data;
        });
        break;
      
      case 'fondos':
        this.productService.getBackdrops().subscribe(data => {
          this.products = data;
        });
        break;

      default:
        this.productService.getDecos().subscribe(data => {
          this.products = data;
        });
        break;
    }
  }

  loadProductsBySubcategory(category: string, subcategory: string) {
    switch (category) {
      case 'props':
        this.productService.getPropsSubCategory(subcategory).subscribe(data => {
          this.products = data;
          console.log("props", data);
        });
        break;
      
      case 'fondos':
        this.productService.getBackdropsSubCategory(subcategory).subscribe(data => {
          this.products = data;
          console.log("fondos", data);
        });
        break;

      default:
        this.productService.getDecosSubCategory(subcategory).subscribe(data => {
          this.products = data;
          console.log("decos", data);
        });
        break;
    }
  }
  
  sendToProduct(product: Product){
    this.router.navigate(['/productos', 
      this.category, product.id]);
  }

}
