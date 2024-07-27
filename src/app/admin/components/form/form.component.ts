import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() datos = new EventEmitter<{ form: NgForm, files: File[] }>();
  @Output() cerrar = new EventEmitter<void>();
  @Input() create!: boolean;
  @Input() edit!: boolean;
  @Input() product: any;
  @ViewChild('form') form!: NgForm;
  selectedImages: string[] = [];
  selectedFiles: File[] = [];

  constructor(private fileUploadService: FileUploadService){}

  // onFileSelected(event: any) {
  //   this.selectedFiles = Array.from(event.target.files);
  //   console.log(this.selectedFiles.map(file => file.name));
  // }

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
          this.selectedImages = this.product.imagenes || [];
        }
      });
    }
  }

  SendItem(form: NgForm){
    console.log("HOLA")
    this.datos.emit({ form, files: this.selectedFiles });
  }
  cerrarForm(){
    this.cerrar.emit();
  }
}
