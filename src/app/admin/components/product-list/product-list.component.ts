import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private cdr: ChangeDetectorRef,private router: Router, private productService: ProductsService, private route: ActivatedRoute, private fileUploadService: FileUploadService) {}

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

  refreshComponent() {
    this.cdr.detectChanges();
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

  onFormSubmit({ form, files, imagesToDelete }: { form: NgForm, files: File[], imagesToDelete: string[] }) {
    if (this.create) {
      this.addItem({ ...form.value, files });
    } else if (this.edit) {
      this.editProduct({ ...form.value, files, imagesToDelete });
    }
  }
  


  editProduct(product: any) {
  
    // Actualizar las imágenes del producto
    product.imagenes = [
      ...product.imagenes.filter((img: string) => !product.imagesToDelete.includes(img)),
      ...product.files.map((file: File) => file.name)
    ];
  
    const { nombre, tapizados, inStock, precio, categoria, imagenes } = product;
  
    this.productService.updateItem(this.category, this.id, { nombre, tapizados, inStock, precio, categoria, imagenes }).subscribe(
      () => {
        console.log('Item updated successfully');
        if (product.files.length > 0) this.fileUploadService.uploadImage(product.files, this.category, nombre);
        if (product.imagesToDelete.length > 0) 
          this.fileUploadService.deleteImage(product.imagesToDelete, this.category, product.nombre)
          .then(() => console.log('All images deleted successfully'))
          .catch(error => {
            console.error('Error deleting images: ', error);
          });
        this.refreshComponent();
      },
      error => {
        console.error('Error updating item: ', error);
      }
    );
  
    this.edit = false;
  }


  addItem(product: any) {
    const { nombre, tapizados, inStock, precio, categoria } = product;
    const Item = {
      nombre, tapizados, inStock, precio, categoria,
      imagenes: product.files.map((file: File) => file.name as string)
    };
  
    this.productService.addItem(this.category, Item).subscribe(
      () => {
        console.log('Item added successfully');
        this.fileUploadService.uploadImage(product.files, this.category, Item.nombre);
        this.refreshComponent();
      },
      error => {
        console.error('Error adding item: ', error);
      }
    );
    this.create = false;
  }

  deleteProduct(product: any) {
    this.productService.deleteItem(this.category, product.id).subscribe(
      () => {
        console.log('Document successfully deleted', product);
        const images = product.imagenes.map(
          (imagen : string) => this.getFileNameFromUrl(imagen)
        )
        this.fileUploadService.deleteImage(images, this.category, product.nombre)
          .then(() => console.log('All images deleted successfully'))
          .catch(error => {
            console.error('Error deleting images: ', error);
          });
      },
      error => {
        console.error('Error deleting document: ', error);
      }
    );
  }
  
  getFileNameFromUrl(url: string): string {
    const decodedUrl = decodeURIComponent(url);
    const parts = decodedUrl.split('/');
    const fileNameWithToken = parts.pop() || '';
    const fileName = fileNameWithToken.split('?')[0];
    return fileName;
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
