// import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { FileUploadService } from 'src/app/services/file-upload.service';

// @Component({
//   selector: 'app-form',
//   templateUrl: './form.component.html',
//   styleUrls: ['./form.component.css']
// })
// export class FormComponent {
//   @Output() datos = new EventEmitter<{ form: NgForm, files: File[] }>();
//   @Output() cerrar = new EventEmitter<void>();
//   @Input() create!: boolean;
//   @Input() edit!: boolean;
//   @Input() product: any;
//   @ViewChild('form') form!: NgForm;
//   selectedImages: string[] = [];
//   selectedFiles: File[] = [];

//   constructor(private fileUploadService: FileUploadService){}


//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files) {
//       this.selectedFiles = Array.from(input.files);
//       this.selectedImages = [];
//       Array.from(input.files).forEach(file => {
//         const reader = new FileReader();
//         reader.onload = (e: any) => {
//           this.selectedImages.push(e.target.result);
//         };
//         reader.readAsDataURL(file);
//       });
//     }
//   }

//   ngAfterViewInit() {
//     if (this.edit) {
//       setTimeout(() => {
//         if (this.form) {
//           this.form.setValue({
//             nombre: this.product.nombre || '',
//             categoria: this.product.categoria || '',
//             precio: this.product.precio || '',
//             imagenes: this.product.imagenes || '',
//             tapizados: this.product.tapizados || '',
//             inStock: this.product.inStock || false,
//             tamaño: this.product.tamaños || ''
//           });
//         }
//       });
//       this.selectedImages = this.product.imagenes || [];
//     }
//   }

//   SendItem(form: NgForm){
//     this.datos.emit({ form, files: this.selectedFiles });
//   }
//   cerrarForm(){
//     this.cerrar.emit();
//   }
// }
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() datos = new EventEmitter<{ form: NgForm, files: File[], imagesToDelete: string[] }>();
  @Output() cerrar = new EventEmitter<void>();
  @Input() create!: boolean;
  @Input() edit!: boolean;
  @Input() product: any;
  @ViewChild('form') form!: NgForm;
  selectedImages: string[] = [];
  selectedFiles: File[] = [];
  imagesToDelete: string[] = [];

  constructor(private fileUploadService: FileUploadService){}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      this.selectedImages = [];
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  ngAfterViewInit() {
    if (this.edit) {
      setTimeout(() => {
        if (this.form) {
          this.form.setValue({
            nombre: this.product.nombre || '',
            categoria: this.product.categoria || '',
            precio: this.product.precio || '',
            imagenes: this.product.imagenes || '',
            tapizados: this.product.tapizados || '',
            inStock: this.product.inStock || false,
            tamaño: this.product.tamaños || ''
          });
        }
      });
      this.selectedImages = this.product.imagenes || [];
    }
  }

  getFileNameFromUrl(url: string): string {
    const decodedUrl = decodeURIComponent(url);
    const parts = decodedUrl.split('/');
    const fileNameWithToken = parts.pop() || '';
    const fileName = fileNameWithToken.split('?')[0];
    return fileName;
  }

  removeImage(image: string) {
    let imageToDelete = this.getFileNameFromUrl(image);
    this.imagesToDelete.push(imageToDelete);
    this.selectedImages = this.selectedImages.filter(img => img !== image);
  }

  SendItem(form: NgForm){
    let images: string[] = [];
    this.edit ? this.product.imagenes.map((imagen: string) => images.push(this.getFileNameFromUrl(imagen))) : [];
    form.value.imagenes = [...images];
    this.datos.emit({ form, files: this.selectedFiles, imagesToDelete: this.imagesToDelete });
    form.reset();
    this.edit = false;
    this.create = false;
  }

  cerrarForm(){
    this.cerrar.emit();
  }
}
