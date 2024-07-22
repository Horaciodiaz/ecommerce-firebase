import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private categories = ['props', 'decos', 'fondos']; // Orden de categorías deseado

  constructor(private firestore: AngularFirestore) {}

  getAllCategories(): Observable<{ [key: string]: string[] }> {
    const storedCategories = localStorage.getItem('allCategories');
    const storedCategoriesObj = storedCategories ? JSON.parse(storedCategories) : null;

    return this.fetchCategoriesFromFirestore().pipe(
      switchMap(fetchedCategories => {
        if (!storedCategoriesObj || this.hasCategoryChanges(storedCategoriesObj, fetchedCategories)) {
          localStorage.setItem('allCategories', JSON.stringify(fetchedCategories));
          return of(fetchedCategories);
        } else {
          return of(storedCategoriesObj);
        }
      })
    );
  }

  private fetchCategoriesFromFirestore(): Observable<{ [key: string]: string[] }> {
    const categoryObservables = this.categories.map(category =>
      this.firestore.collection(category).get().pipe(
        map(snapshot => {
          const subcategories = new Set<string>();
          snapshot.docs.forEach(doc => {
            const data = doc.data();
            const dataObj = data as { [key: string]: any };
            if (dataObj && dataObj['categoria']) {
              subcategories.add(dataObj['categoria']);
            }
          });
          return { [category]: Array.from(subcategories) };
        })
      )
    );

    return forkJoin(categoryObservables).pipe(
      map(results => {
        const combinedCategories = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        return this.categories.reduce((orderedAcc, category) => {
          if (combinedCategories[category]) {
            orderedAcc[category] = combinedCategories[category];
          }
          return orderedAcc;
        }, {} as { [key: string]: string[] });
      })
    );
  }

  private hasCategoryChanges(
    storedCategories: { [key: string]: string[] },
    fetchedCategories: { [key: string]: string[] }
  ): boolean {
    for (const category of this.categories) {
      if (
        !storedCategories[category] ||
        !fetchedCategories[category] ||
        storedCategories[category].length !== fetchedCategories[category].length ||
        !storedCategories[category].every(subcategory => fetchedCategories[category].includes(subcategory))
      ) {
        return true;
      }
    }
    return false;
  }
}
