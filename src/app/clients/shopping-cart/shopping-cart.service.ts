import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  productos: any[] = [];

  constructor() {
    this.cargarCarrito();
  }

  private guardarCarrito() {
    sessionStorage.setItem('carrito', JSON.stringify(this.productos));
  }

  private cargarCarrito() {
    const carritoGuardado = sessionStorage.getItem('carrito');
    if (carritoGuardado) {
      this.productos = JSON.parse(carritoGuardado);
    }
  }

  addProduct(product: any) {
    this.productos.push(product);
    this.guardarCarrito();
  }

  removeProduct(index: number) {
    console.log(index);
    this.productos.splice(index, 1);
    this.guardarCarrito();
    Swal.fire({
      position: "top-end",
      title: "Producto Eliminado",
      showConfirmButton: false,
      timer: 1500,
      backdrop: false,
      timerProgressBar: true
    });
  }

  vaciarCarrito() {
    this.productos = [];
    sessionStorage.removeItem('carrito'); // Vaciar el carrito del sessionStorage
  }
}
