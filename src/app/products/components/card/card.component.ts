import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/productInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() product!: Product;
  @Input() category: string = '';

  constructor(private router: Router){

  }

}
