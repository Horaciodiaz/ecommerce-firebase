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
  products: any[] = [];
  category: string = 'props';
  subcategory: string = '';
  loading: boolean = true;

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
    this.productService.getProducts(category).subscribe(
      data => {
        this.products = data;
        this.loading = false;
        console.log(data)
      },
      error => {
        console.error('Error al obtener productos:', error);
        this.loading = true;
      }
    );
  }

  loadProductsBySubcategory(category: string, subcategory: string) {
    this.productService.getProductsWithCategory(category, subcategory).subscribe(
      data => {
        this.products = data;
        this.loading = false;
      },
      error => {
        console.error('Error al obtener productos:', error);
        this.loading = false;
      }
    );
  }

  sendToProduct(product: Product){
    this.router.url.includes('admin') ? this.router.navigate(['admin/productos', this.category, product.id]) : this.router.navigate(['/productos', this.category, product.id])
  }

}
