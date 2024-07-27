import { Component, OnInit } from '@angular/core';
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
        this.products.map(
          product => {
            this.product.imagenes = this.fileUploadService.getImages(product.imagenes, this.category, product.nombre);
          }
        )
        this.loading = false;
      },
      error => {
        console.error('Error al obtener productos:', error);
        this.loading = true;
      },
      () => {

      }
    );
  }

  loadProductsBySubcategory(category: string, subcategory: string) {
    this.productService.getProductsWithCategory(category, subcategory).subscribe(
      data => {
        this.products = data;
        this.products.map(
          product => {
            console.log(product.imagenes)
            this.product.imagenes.map( (imagen: string) => {
              imagen = this.fileUploadService.getImages(imagen, this.category, product.nombre).then( value => value)
            })
          }
        )
      },
      error => {
        console.error('Error al obtener productos:', error);
        this.loading = false;
      }
    );
  }

  onFormSubmit({ form, files }: { form: NgForm, files: File[] }) {
    console.log("hola", form.value, files )
    // this.product = { ...form.value, files };
    if (this.create) {
      this.addItem({ ...form.value, files });
    } else if (this.edit) {
      this.editProduct({ ...form.value, files });
    }
  }
//TODO MODIFICAR EDIT PARA QUE REVISE SI LAS IMAGENES YA EXISTEN Y CAMBIARLAS O AGREGAR NUEVAS.
  editProduct(product: any) {
    console.log("EDIT PRODUCT",product)

    product.value.imagenes = product.files.map(
      (file : File) => file.name
    )

    this.productService.updateItem(this.category, this.id, product.value).subscribe(
      () => {
        console.log('Item updated successfully');
        this.fileUploadService.uploadImage(product.files, this.category, product.value.nombre);
        this.product.resetForm(); // Limpiar el formulario después de agregar el elemento
      },
      error => {
        console.error('Error updating item: ', error);
      }
    );

    this.loadProductsByCategory(this.category);
    this.edit = false;

  }

  addItem(product: any) {
    const { nombre, tapizados, inStock, precio, categoria} = product;
    const Item = {
      nombre, tapizados, inStock, precio, categoria,
      imagenes: product.files.map(
        (file : File) => file.name as string
      )
    }


    this.productService.addItem(this.category, Item).subscribe(
      () => {
        console.log('Item added successfully');
        this.fileUploadService.uploadImage( product.files, this.category, Item.nombre);
        // product.resetForm(); // Limpiar el formulario después de agregar el elemento
      },
      error => {
        console.error('Error adding item: ', error);
      }
    );
    this.loadProductsByCategory(this.category);
    this.create = false;
  }
  deleteProduct(product: any) {
    this.productService.deleteItem(this.category,product.id).subscribe(
      () => {
        console.log('Document successfully deleted');
        this.fileUploadService.deleteImage(product.imagenes, this.category, product.name);
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
