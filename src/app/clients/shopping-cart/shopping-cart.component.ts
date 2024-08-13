import { Component } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  productos: any[] = [];
  makeOrder: boolean = false; // Inicializado en false

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.productos = this.shoppingCartService.productos;
  }

  removeProduct(index: number) {
    this.shoppingCartService.removeProduct(index);
  }

  get total(): number {
    return this.productos
      .map((product: any) => product.precio)
      .reduce((accumulator: number, price: number) => accumulator + price, 0);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price).replace('US$', '$');
  }

  proceedToCheckout() {
    this.makeOrder = true; // Cambia a true cuando se decida proceder con el pedido
  }
}
