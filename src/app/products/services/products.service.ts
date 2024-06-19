import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Prop, Backdrop, Decoration, Product } from '../interfaces/productInterface';

@Injectable()
export class ProductsService {

  private jsonUrl: string = '../../../assets/productos.json';

  constructor(private http: HttpClient) { }
  
  getProps(): Observable<Prop[]> {
    return this.http.get<Prop[]>(this.jsonUrl).pipe(
      map((data: any) => data.props)
    );
  }

  getBackdrops(): Observable<Backdrop[]> {
    return this.http.get<Backdrop[]>(this.jsonUrl).pipe(
      map((data: any) => data.backdrops)
    );
  }

  getDecos(): Observable<Decoration[]> {
    return this.http.get<Decoration[]>(this.jsonUrl).pipe(
      map((data: any) => data.decos)
    );
  }
  getProduct(id: string): Observable<Prop | Backdrop | Decoration> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map((data: any) => {
        let product: Prop | Backdrop | Decoration | undefined;

        // Buscar el producto en las categorías disponibles
        if (data.backdrops) {
          product = data.backdrops.find((item: any) => item.id === id);
        }
        if (!product && data.props) {
          product = data.props.find((item: any) => item.id === id);
        }
        if (!product && data.decos) {
          product = data.decos.find((item: any) => item.id === id);
        }

        if (!product) {
          throw new Error(`Product with id ${id} not found`);
        }

        return product;
      })
    );
  }
}
