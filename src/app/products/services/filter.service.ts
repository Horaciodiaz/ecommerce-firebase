import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
interface Category {
  subcategorias: any[];
}
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private categories = ['props', 'decos', 'fondos']; // Orden de categorías deseado
  private localStorageKey = 'categoriesData';

  constructor(private firestore: AngularFirestore) {}

  getAllCategories(): Observable<any> {
    return from(this.getStoredCategories()).pipe(
      switchMap(storedCategories => {
        if (storedCategories) {
          return this.checkForUpdates(storedCategories).pipe(
            switchMap(updatedCategories => {
              if (updatedCategories) {
                this.storeCategories(updatedCategories);
                return from([updatedCategories]);
              } else {
                return from([storedCategories]);
              }
            })
          );
        } else {
          return this.fetchCategoriesFromFirestore().pipe(
            map(fetchedCategories => {
              this.storeCategories(fetchedCategories);
              return fetchedCategories;
            })
          );
        }
      })
    );
  }

  private fetchCategoriesFromFirestore(): Observable<any> {
    const categoryObservables: Observable<any>[] = this.categories.map(category => 
      this.firestore.collection('categorias').doc(category).get().pipe(
        map(snapshot => {
          const data = snapshot.data() as Category;
          return { [category]: data ? data.subcategorias : [] };
        })
      )
    );

    return forkJoin(categoryObservables).pipe(
      map(results => results.reduce((acc, curr) => ({ ...acc, ...curr }), {}))
    );
  }

  private storeCategories(categories: any): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
  }

  private getStoredCategories(): Promise<any> {
    const storedCategories = localStorage.getItem(this.localStorageKey);
    return Promise.resolve(storedCategories ? JSON.parse(storedCategories) : null);
  }

  private checkForUpdates(storedCategories: any): Observable<any> {
    return this.fetchCategoriesFromFirestore().pipe(
      map(fetchedCategories => {
        if (JSON.stringify(fetchedCategories) !== JSON.stringify(storedCategories)) {
          return fetchedCategories;
        } else {
          return null;
        }
      })
    );
  }

}
