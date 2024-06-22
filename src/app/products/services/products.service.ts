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
  getPropsSubCategory(subcategory: string){
    return this.http.get<Prop[]>(this.jsonUrl).pipe(
      map((data: any) => data.props), // Obtener el arreglo de props del JSON
      map(props => props.filter((prop: Prop) => prop.category === subcategory))
    );
  }

  getBackdrops(): Observable<Backdrop[]> {
    return this.http.get<Backdrop[]>(this.jsonUrl).pipe(
      map((data: any) => data.backdrops)
    );
  }
  getBackdropsSubCategory(subcategory: string): Observable<Backdrop[]> {
    return this.http.get<Backdrop[]>(this.jsonUrl).pipe(
      map((data: any) => data.backdrops), // Obtener el arreglo de backdrops del JSON
      map(backdrops => {
        return backdrops.filter((backdrop: Backdrop) => backdrop.category === subcategory)
      })
    );
  }

  getDecos(): Observable<Decoration[]> {
    return this.http.get<Decoration[]>(this.jsonUrl).pipe(
      map((data: any) => data.decos)
    );
  }
  getDecosSubCategory(subcategory:string){
    return this.http.get<Decoration[]>(this.jsonUrl).pipe(
      map((data: any) => data.decos), // Obtener el arreglo de decos del JSON
      map(decos => {
        return decos.filter((deco: Decoration) => deco.category == subcategory)
      })
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
