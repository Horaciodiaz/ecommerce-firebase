import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from '@angular/fire/auth'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  auth = getAuth();

  constructor(private firestore: AngularFirestore) { }

  async registerUser(email: string, password: string, rol: string, nombre: string, apellido: string){
    const infoUser = await createUserWithEmailAndPassword(this.auth, email, password)
    .then((userFirebase) => {
      return userFirebase;
    })
    .catch(
      (error) => console.error(error)
    )
    
    console.log(infoUser!.user.uid)
    const docRef = doc(this.firestore.firestore ,`usuarios/${infoUser!.user.uid}`);
    setDoc(docRef, {
      correo: email,
      rol: rol,
      nombre: nombre,
      apellido: apellido
    });
  }

  signOut(){
    return signOut(this.auth);
  }


  async userRol(uid: string): Promise<string | null> {
    const docRef = doc(this.firestore.firestore, `usuarios/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const rol = docSnap.data()['rol'];
      console.log("Document data:", rol);
      return rol;  // Retorna el rol como un string
    } else {
      console.log("No such document!");
      return null;  // Retorna null si no existe el documento
    }
  }
  

  async login(email: string, password: string): Promise<string | null> {
    try {
      const value = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(value);
      const rol = await this.userRol(value.user.uid);
      return rol;  // Retorna el rol
    } catch (error) {
      console.error(error);
      return null;  // Retorna null en caso de error
    }
  }
  
  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          observer.next(true); // Usuario logueado
        } else {
          observer.next(false); // Usuario no logueado
        }
        observer.complete();
      });
    });
  }

  // Alternativa usando un observable directamente
  getCurrentUser(): Observable<any | null> {
    return new Observable<any | null>(observer => {
      onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
        observer.complete();
      });
    });
  }

  async getUser(id: string): Promise<any> {
    try {
      const userDocRef = doc(this.firestore.firestore, `usuarios/${id}`);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        return userDoc.data(); // Devuelve los datos del usuario
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error getting user:', error);
      throw error; // Lanza el error para manejarlo en el componente o donde se llama este método
    }
  }

  async updateUserOrders(orderId: string, userId: string): Promise<void> {
    try {
      // Crea la referencia al documento con la colección y el ID del documento
      const userDocRef = doc(this.firestore.firestore, `usuarios/${userId}`);
      
      // Realiza la actualización del documento
      await updateDoc(userDocRef, {
        orders: arrayUnion(orderId),
      });
    } catch (error) {
      console.error('Error updating order list:', error);
      throw new Error('Failed to update order list');
    }
  }
}
