import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Producto {
  categoria: string;
  [key: string]: any; // Esto permite otras propiedades dinámicas
}
@Injectable()
export class ProductsService {

  productos: any = [];

  constructor( private firestore: AngularFirestore){
  }

  getProducts(collection: string) : Observable<any[]>{
    return this.firestore.collection(collection).snapshotChanges().pipe(
      map(products => products.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        if (typeof data === 'object' && data !== null) {
          return { id, ...data };
        } else {
          console.error('El documento no contiene un objeto válido:', a.payload.doc);
          return { id }; // Si data no es un objeto, devuelve solo el id
        }
      }))
    );
  }

  getProductsWithCategory(collection: string, subcategory: string): Observable<any[]>{
    return this.firestore.collection(collection).stateChanges().pipe(
      map(actions => actions
        .map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          // Verificar que data es un objeto con la propiedad "categoria"
          if (typeof data === 'object' && data !== null && 'categoria' in data) {
            const dataObj = data as { [key: string]: any }; // Asumir que data es un objeto genérico
            if (dataObj['categoria'] === subcategory) {
              return { id, ...dataObj };
            }
          } else {
            console.error('El documento no contiene un objeto válido:', a.payload.doc);
          }
          return null; // Retorna null si el documento no es válido o no coincide con la subcategoría
        })
        .filter(item => item !== null) // Filtra los nulls
      )
    );
  }

  getProps(): Observable<any[]> {
    return this.firestore.collection('props').stateChanges().pipe(
      map(props => props.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        if (typeof data === 'object' && data !== null) {
          return { id, ...data };
        } else {
          console.error('El documento no contiene un objeto válido:', a.payload.doc);
          return { id }; // Si data no es un objeto, devuelve solo el id
        }
      }))
    );
  }

  getBackdrops(): Observable<any[]> {
    return this.firestore.collection('fondos').stateChanges().pipe(
      map(fondos => fondos.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        if (typeof data === 'object' && data !== null) {
          return { id, ...data };
        } else {
          console.error('El documento no contiene un objeto válido:', a.payload.doc);
          return { id }; // Si data no es un objeto, devuelve solo el id
        }
      }))
    );
  }
  getDecos(): Observable<any[]> {
    return this.firestore.collection('decos').stateChanges().pipe(
      map(decos => decos.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        if (typeof data === 'object' && data !== null) {
          return { id, ...data };
        } else {
          console.error('El documento no contiene un objeto válido:', a.payload.doc);
          return { id }; // Si data no es un objeto, devuelve solo el id
        }
      }))
    );
  }
  getPropsSubCategory(subcategory: string) {
    return this.firestore.collection('props').stateChanges().pipe(
      map(actions => actions
        .map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          // Verificar que data es un objeto con la propiedad "categoria"
          if (typeof data === 'object' && data !== null && 'categoria' in data) {
            const dataObj = data as { [key: string]: any }; // Asumir que data es un objeto genérico
            if (dataObj['categoria'] === subcategory) {
              return { id, ...dataObj };
            }
          } else {
            console.error('El documento no contiene un objeto válido:', a.payload.doc);
          }
          return null; // Retorna null si el documento no es válido o no coincide con la subcategoría
        })
        .filter(item => item !== null) // Filtra los nulls
      )
    );
  }


  getBackdropsSubCategory(subcategory: string) {
    return this.firestore.collection('fondos').stateChanges().pipe(
      map(actions => actions
        .map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          if (typeof data === 'object' && data !== null && 'categoria' in data) {
            const dataObj = data as { [key: string]: any };
            if (dataObj['categoria'] === subcategory) {
              return { id, ...dataObj };
            }
          } else {
            console.error('El documento no contiene un objeto válido:', a.payload.doc);
          }
          return null;
        })
        .filter(item => item !== null)
      )
    );
  }

  getDecosSubCategory(subcategory:string){
    return this.firestore.collection('decos').stateChanges().pipe(
      map(actions => actions
        .map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          if (typeof data === 'object' && data !== null && 'categoria' in data) {
            const dataObj = data as { [key: string]: any };
            if (dataObj['categoria'] === subcategory) {
              return { id, ...dataObj };
            }
          } else {
            console.error('El documento no contiene un objeto válido:', a.payload.doc);
          }
          return null;
        })
        .filter(item => item !== null)
      )
    );
  }

getProduct(collection: string, idProduct: string) {
  if (!idProduct) {
    console.error('El ID del producto es inválido:', idProduct);
    return of(null); // Retorna un observable con valor null si el ID es inválido
  }

  return this.firestore.collection(collection).doc(idProduct).get().pipe(
    map(docSnapshot => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        const id = docSnapshot.id;
        if (typeof data === 'object' && data !== null) {
          return { id, ...data };
        } else {
          console.error('El documento no contiene un objeto válido:', docSnapshot.data);
          return { id }; // Si data no es un objeto, devuelve solo el id
        }
      } else {
        console.error('El documento con el ID proporcionado no existe:', idProduct);
        return null;
      }
    })
  );
}

getProp(idProduct: string): Observable<any> {
  return this.getProduct('props', idProduct);
}

getDeco(idProduct: string): Observable<any> {
  return this.getProduct('decos', idProduct);
}

getFondo(idProduct: string): Observable<any> {
  return this.getProduct('fondos', idProduct);
}

addItem(collection: string, data: any): Observable<void> {
  const id = this.firestore.createId(); // Genera un ID único
  return new Observable<void>(observer => {
    this.firestore.collection(collection).doc(id).set(data)
      .then(() => {
        observer.next();
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
  });
}

deleteItem(collectionName: string, docId: string): Observable<void> {
  return new Observable<void>((observer) => {
    this.firestore.collection(collectionName).doc(docId).delete()
      .then(() => {
        observer.next();
        observer.complete();
      })
      .catch(error => {
        console.error("Error removing document: ", error);
        observer.error(error);
      });
  });
}

updateItem(collection: string, docId: string, data: any): Observable<void> {
  return new Observable<void>((observer) => {
    this.firestore.collection(collection).doc(docId).update(data)
      .then(() => {
        observer.next();
        observer.complete();
      })
      .catch(error => {
        console.error("Error actualizando el document: ", error);
        observer.error(error);
      });
  });
}

}
