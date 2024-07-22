import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  productos: any[] = [];

  addProduct(product: any){
    this.productos.push(product);
  }

  removeProduct(index: any){
    console.log(index);
    this.productos.splice(index, 1);
    Swal.fire({
      position: "top-end",
      title: "Producto Eliminado",
      showConfirmButton: false,
      timer: 1500,
      backdrop: false
    });
  }
  
}
