import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: any) => {
        if (user) {
          return this.firestore.doc(`usuarios/${user.uid}`).valueChanges(); // Ajusta la ruta si es necesario
        } else {
          return of(null);
        }
      })
    );
  }
}
