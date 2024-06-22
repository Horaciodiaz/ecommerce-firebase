import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {


  constructor(private productService: ProductsService){}

  getCategories(category: string): Observable<string[]> {
    let categories: Set<string> = new Set();
    let categoryObservable: Observable<any>;
  
    if (category === 'Props') {
      categoryObservable = this.productService.getProps();
    } else if (category === 'Backdrops') {
      categoryObservable = this.productService.getBackdrops();
    } else {
      categoryObservable = this.productService.getDecos();
    }
  
    return categoryObservable.pipe(
      map(products => {
        products.forEach((product: any) => {
          categories.add(product.category);
        });
        return Array.from(categories);
      })
    );
  }
}
