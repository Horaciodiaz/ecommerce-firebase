import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { ShoppingCartService } from 'src/app/clients/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() product!: any;
  @Input() category: string = '';

  constructor(private shoppingCartService: ShoppingCartService){

  }
  formatPrice(price: number): string {
    const formattedPrice = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

    // Reemplaza 'US$' con '' y coloca '$' al principio
    return '$' + formattedPrice.replace('US$', '');
  }
  addToCart(event: MouseEvent, product: any){
    event.stopPropagation();
    let item = {
      ...product
    }
    this.shoppingCartService.addProduct(item);
    Swal.fire({
      position: "bottom",
      title: "Producto añadido al carrito",
      showConfirmButton: false,
      timer: 1500,
      backdrop: false
    });
  }
  handleDudasClick(event: MouseEvent): void {
    event.stopPropagation();
    // Lógica para manejar el clic en 'Dudas?'
  }
}
