import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  products = [
    { id: 1, name: 'Producto 1' },
    { id: 2, name: 'Producto 2' },
  ];

  addProduct() {
    // Función para agregar un producto
  }

  editProduct(product: any) {
    // Función para editar un producto
  }

  deleteProduct(id: number) {
    // Función para eliminar un producto
  }
}
