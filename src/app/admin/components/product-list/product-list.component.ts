import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/products/services/products.service';
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
  create: boolean = false;
  edit: boolean = false;
  id: string = '';

  product: any;
  productToEdit: any;

  constructor(private router: Router, private productService: ProductsService, private route: ActivatedRoute, private fileUploadService: FileUploadService) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.pipe(
      switchMap(params => {
        this.category = this.router.url.slice(16);
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

  editProduct() {
    console.log(this.product.value)
    if (this.product.valid) {
      const formValue = this.product.value;

      // Verificar que formValue.imagenes y formValue.tapizados sean cadenas
      const imagenes = typeof formValue.imagenes === 'string' ? formValue.imagenes.split(',').map((img: any) => img.trim()) : formValue.imagenes;
      const tapizados = typeof formValue.tapizados === 'string' ? formValue.tapizados.split(',').map((tap: any) => tap.trim()) : formValue.tapizados;

      const newItem = {
        ...formValue,
        imagenes,
        tapizados
      };

      this.productService.updateItem(this.category, this.id, newItem).subscribe(
        () => {
          console.log('Item updated successfully');
          this.product.resetForm(); // Limpiar el formulario después de agregar el elemento
        },
        error => {
          console.error('Error updating item: ', error);
        }
      );
    }

    this.loadProductsByCategory(this.category);
    this.edit = false;
  }

  addItem() {
    if (this.product.valid) {
      const formValue = this.product.value;

      // Convertir las cadenas separadas por comas en arrays
      const newItem = {
        ...formValue,
        imagenes: formValue.imagenes ? formValue.imagenes.split(',').map((img: any) => img.trim()) : [],
        tapizados: formValue.tapizados ? formValue.tapizados.split(',').map((tap: any) => tap.trim()) : []
      };

      this.productService.addItem(this.category, newItem).subscribe(
        () => {
          console.log('Item added successfully');
          this.product.resetForm(); // Limpiar el formulario después de agregar el elemento
        },
        error => {
          console.error('Error adding item: ', error);
        }
      );
    }
    this.loadProductsByCategory(this.category);
    this.create = false;
  }

  deleteProduct(id: string) {
    this.productService.deleteItem(this.category, id).subscribe(
      () => {
        console.log('Document successfully deleted');
        // Aquí puedes hacer otras cosas como actualizar la lista de documentos
        this.loadProductsByCategory(this.category);
      },
      error => {
        console.error('Error deleting document: ', error);
      }
    );
  }

  formatPrice(price: number): string {
    const formattedPrice = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    return '$' + formattedPrice.replace('US$', '');
  }
}
