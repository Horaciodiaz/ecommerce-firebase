import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/productInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() product!: any;
  @Input() category: string = '';

  constructor(private router: Router){

  }
  formatPrice(price: number): string {
    const formattedPrice = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    // Reemplaza 'US$' con '' y coloca '$' al principio
    return '$' + formattedPrice.replace('US$', '');
  }
}
