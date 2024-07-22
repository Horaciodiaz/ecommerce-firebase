import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Testimonial } from '../clients/interfaces/testimonials.interface';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  testimonios: Testimonial[] = [];
  private testimonialsSubject = new BehaviorSubject<any[]>([]);
  testimonials$ = this.testimonialsSubject.asObservable();
  private testimonialsMap = new Map<string, any>();

  constructor( private firestore: AngularFirestore){
    this.initializeTestimonials();
  }

  private initializeTestimonials() {
    this.firestore.collection('testimonios').stateChanges().pipe(
      map(actions => actions.forEach(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;

        if (typeof data === 'object' && data !== null) {
          if (action.type === 'added' || action.type === 'modified') {
            this.testimonialsMap.set(id, { id, ...data });
          } else if (action.type === 'removed') {
            this.testimonialsMap.delete(id);
          }
        } else {
          console.error('El documento no contiene un objeto válido:', action.payload.doc);
        }

        // Actualiza la lista en el BehaviorSubject
        this.testimonialsSubject.next(Array.from(this.testimonialsMap.values()));
      }))
    ).subscribe();
  }

// Elimina este método si no es necesario
getTestimonials(): Observable<any> {
  return this.firestore.collection('testimonios').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      if (typeof data === 'object' && data !== null) {
        return { id, ...data };
      } else {
        console.error('El documento no contiene un objeto válido:', a.payload.doc);
        return { id }; // Si data no es un objeto, devuelve solo el id
      }
    })),
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
  );
}



addItem(data: any): Observable<void> {
  const id = this.firestore.createId(); // Genera un ID único
  return from(this.firestore.collection('testimonios').doc(id).set(data));
}

deleteItem(docId: string): Observable<void> {
  return from(this.firestore.collection('testimonios').doc(docId).delete());
}

updateItem(docId: string, data: any): Observable<void> {
  return from(this.firestore.collection('testimonios').doc(docId).update(data));
}
}
