import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/interface';
import { Carrito, Item } from '../interfaces/client.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  
  private _products: Producto[] = [
    {
      id:'aronewborn',
      nombre: 'aro new born',
      precio: 3000,
      categoria: 'prop',
      subcategoria: 'new born',
      descripcion: 'aro new born para niños de hasta 1 año color blanco',
      imagenes: [ '../../../assets/aro1','../../../assets/aro2','../../../assets/aro3' ]
    },
    {
      id:'hamaca',
      nombre: 'hamaca',
      precio: 4000,
      categoria: 'prop',
      subcategoria: 'hamacas',
      descripcion: 'hamaca para chicos mayores a 1 año color blanco gastado altura 1 metro',
      imagenes: [ '../../../assets/hamaca1','../../../assets/hamaca2','../../../assets/hamaca3' ]
    }
  ];

  public carrito: Carrito = {
    items: [
      // {
      //   productoId: this.products[0].id,
      //   cantidad: 2
      // },
      // {
      //   productoId: this.products[1].id,
      //   cantidad: 2
      // }
    ]
  }

  get products(){
    return this._products;
  }

  returnProduct(id: string): Producto{
    return this.products.find(product => product.id == id)!;
  }
}
