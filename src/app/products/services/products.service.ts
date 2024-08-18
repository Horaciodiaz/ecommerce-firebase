import { Injectable } from '@angular/core';
import { Observable, catchError, filter, forkJoin, from, map, mergeMap, of, switchMap, take, toArray } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileUploadService } from 'src/app/services/file-upload.service';

interface Producto {
  categoria: string;
  nombre: string,
  descripcion: string,
  imagenes: string[]
  [key: string]: any; // Esto permite otras propiedades dinámicas
}

interface Categoria {
  subcategorias: string[];
}
@Injectable()
export class ProductsService {

  productos: any = [];

  constructor(private firestore: AngularFirestore, private fileService: FileUploadService) {
  }

  getProducts(collection: string): Observable<Producto[]> {
    return this.firestore.collection<Producto>(collection).valueChanges({ idField: 'id' }).pipe(
      mergeMap((products: (Producto)[]) => {
        return from(products).pipe(
          mergeMap(async (product: Producto) => {
            const imageUrls: string[] = [];

            for (const imagen of product.imagenes) {
              try {
                const url = await this.fileService.getImages(imagen, collection, product.nombre);
                imageUrls.push(url);
              } catch (error) {
                console.error(error);
              }
            }

            return { ...product, imagenes: imageUrls };
          }),
          toArray()
        );
      })
    );
  }

  getProductsWithCategory(collection: string, subcategory: string): Observable<Producto[]> {
    return this.firestore.collection(collection).snapshotChanges().pipe(
      switchMap(actions => {
        const productData = actions.map(a => {
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;
          return { id, ...data };
        });

        return from(productData).pipe(
          mergeMap(async (product: Producto) => {
            // Verificar si el producto pertenece a la subcategoría
            if (product.categoria === subcategory) {
              const imageUrls: string[] = [];

              for (const imagen of product.imagenes) {
                try {
                  const url = await this.fileService.getImages(imagen, collection, product.nombre);
                  imageUrls.push(url);
                } catch (error) {
                  console.error(error);
                }
              }

              return { ...product, imagenes: imageUrls };
            }
            return null; // No devolverá productos que no coincidan con la subcategoría
          }),
          filter((product): product is Producto => product !== null), // Filtra nulls y asegura el tipo
          toArray()
        );
      })
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
  

  addSubcategory(categoryId: string, subcategory: string): Observable<void> {
    const categoryRef = this.firestore.collection('categorias').doc(categoryId);

    return categoryRef.get().pipe(
      take(1),
      switchMap(docSnapshot => {
        if (docSnapshot.exists) {
          const data = docSnapshot.data() as Categoria;
          const subcategories = data?.subcategorias || [];

          // Verificar si la subcategoría ya existe
          if (subcategories.includes(subcategory)) {
            return of(undefined); // No hacer nada si ya existe
          } else {
            // Agregar la nueva subcategoría
            subcategories.push(subcategory);
            return from(categoryRef.update({ subcategorias: subcategories }));
          }
        } else {
          // Manejar el caso en que el documento no exista
          throw new Error(`Category ${categoryId} does not exist`);
        }
      }),
      catchError(error => {
        console.error('Error adding subcategory:', error);
        throw error;
      })
    );
  }

  addItem(collection: string, data: any): Observable<void> {
    const id = this.firestore.createId(); // Genera un ID único
    return new Observable<void>(observer => {
      this.firestore.collection(collection).doc(id).set(data)
        .then(() => {
          this.addSubcategory(collection, data.categoria).subscribe(
            () => {
              console.log('Subcategory added successfully');
            },
          )
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
