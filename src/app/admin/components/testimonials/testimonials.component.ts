import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Testimonial } from 'src/app/clients/interfaces/testimonials.interface';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  create: boolean = false;
  edit: boolean = false;
  id: string = '';
  @ViewChild('form') form!: NgForm;
  testimonios: Testimonial[] = [];

  constructor(private testimonalService: TestimonialService) {}

  ngOnInit() {
    this.testimonalService.testimonials$.subscribe((data) => {
      this.testimonios = data.sort((a: any, b: any) =>
        a.nombre.localeCompare(b.nombre)
      );
    });
  }

  setForm(testimonio: Testimonial) {
    setTimeout(() => {
      if (this.form) {
        this.form.setValue({
          nombre: testimonio.nombre,
          cita: testimonio.cita,
          imagen: testimonio.imagen,
        });
      }
    });
  }

  sendForm(form: NgForm) {
    debugger;
    if (this.create) this.addTestimonio(form);
    if (this.edit) this.editTestimonio(form);
  }

  addTestimonio(form: NgForm) {
    if (form.valid) {
      const newItem = {
        ...form.value,
      };
      this.testimonalService.addItem(newItem).subscribe(
        () => {
          console.log('Item agregado successfully');
          form.resetForm(); // Limpiar el formulario después de agregar el elemento
          this.create = false;
        },
        (error) => {
          console.error('Error updating item: ', error);
        }
      );
    }
  }

  editTestimonio(form: NgForm) {
    if (form.valid) {
      const newItem = {
        ...form.value,
      };
      this.testimonalService.updateItem(this.id, newItem).subscribe(
        () => {
          console.log('Item agregado successfully');
          form.resetForm();
          this.edit = false;
        },
        (error) => {
          console.error('Error updating item: ', error);
        }
      );
    }
  }

  deleteTestimonio(id: string) {
    this.testimonalService.deleteItem(id).subscribe(
      () => {
        console.log('Document successfully deleted');
      },
      (error) => {
        console.error('Error deleting document: ', error);
      }
    );
  }
}
