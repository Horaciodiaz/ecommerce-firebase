import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Output() datos = new EventEmitter<NgForm>();
  @Output() cerrar = new EventEmitter<void>();
  @Input() create!: boolean;
  @Input() edit!: boolean;
  @Input() product: any;
  @ViewChild('form') form!: NgForm;
  selectedFiles: File[] = [];

  constructor(private fileUploadService: FileUploadService){}

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
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
    }
  }

  SendItem(form: NgForm){
    this.datos.emit(form);
  }
  cerrarForm(){
    this.cerrar.emit();
  }
}
