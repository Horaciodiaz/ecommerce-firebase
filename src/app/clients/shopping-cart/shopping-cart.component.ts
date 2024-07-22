import { Component } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  productos: any[] = [];
  private _total: number = 0;

  constructor(private shoppingCartService: ShoppingCartService){}

  ngOnInit(){
    this.productos = this.shoppingCartService.productos;
  }

  removeProduct(index: number){
    this.shoppingCartService.removeProduct(index);
  }

  get total(): number{
    let total = this.productos.map((product: any) => -product.precio *-1)
    .reduce((accumulator: number, product: any) => accumulator + product);
    return total;
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
