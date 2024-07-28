import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/productInterface';
import { switchMap } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

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

  constructor(private router: Router ,private productService: ProductsService, private route: ActivatedRoute, private fileUploadService: FileUploadService){}

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
    this.loading = true;
    this.productService.getProducts(category).subscribe(
      data => {
        this.products = data;
        const allImagePromises = this.products.map(product => {
          const imagePromises = product.imagenes.map((imagen: string) => 
            this.fileUploadService.getImages(imagen, this.category, product.nombre)
          );
  
          return Promise.all(imagePromises)
            .then(images => {
              product.imagenes = images;
            })
            .catch(error => console.error('Error al obtener imágenes:', error));
        });
  
        Promise.all(allImagePromises)
          .then(() => {
            this.loading = false;
          })
          .catch(error => {
            console.error('Error al obtener todas las imágenes:', error);
            this.loading = false; // Puedes decidir si quieres mantener el loading en true en caso de error
          });
      },
      error => {
        console.error('Error al obtener productos:', error);
        this.loading = true;
      }
    );
  }
  
  

  loadProductsBySubcategory(category: string, subcategory: string) {
    this.loading = true;
    this.productService.getProductsWithCategory(category, subcategory).subscribe(
      data => {
        this.products = data;
        const allImagePromises = this.products.map(product => {
          const imagePromises = product.imagenes.map((imagen: string) => 
            this.fileUploadService.getImages(imagen, this.category, product.nombre)
          );
  
          return Promise.all(imagePromises)
            .then(images => {
              product.imagenes = images;
            })
            .catch(error => console.error('Error al obtener imágenes:', error));
        });
  
        Promise.all(allImagePromises)
          .then(() => {
            this.loading = false;
          })
          .catch(error => {
            console.error('Error al obtener todas las imágenes:', error);
            this.loading = false; // Puedes decidir si quieres mantener el loading en true en caso de error
          });
      },
      error => {
        console.error('Error al obtener productos:', error);
        this.loading = true;
      }
    );
  }

  sendToProduct(product: Product){
    this.router.url.includes('admin') ? this.router.navigate(['admin/productos', this.category, product.id]) : this.router.navigate(['/productos', this.category, product.id])
  }

}
