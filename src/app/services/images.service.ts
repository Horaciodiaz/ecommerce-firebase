import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { deleteObject, FirebaseStorage, getDownloadURL, ref, uploadBytes, Storage, listAll } from '@angular/fire/storage';
interface PromotionalImage {
  imageUrl: string;
  title: string;
  subtitle: string;
  category: 'props' | 'decos' | 'fondos';
}
@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private storage: Storage, private firestore: Firestore) { }

  // Subir imagen promocional
  async uploadPromotionalImage(file: File, title: string, subtitle: string, category: 'props' | 'decos' | 'fondos'): Promise<void> {
    const imgRef = ref(this.storage, `promotions/${category}/${file.name}`);
    
    try {
      await uploadBytes(imgRef, file);

      const imageData = {
        title,
        subtitle,
        category,
        imageName: file.name
      };

      // Guarda los datos en Firestore
      const carruselCollection = collection(this.firestore, 'carrusel');
      await addDoc(carruselCollection, imageData);

      console.log('Image uploaded and saved to Firestore:', imageData);
    } catch (error) {
      console.error('Error uploading and saving promotional image:', error);
      throw error;
    }
  }

  async getAllImagesByCategory(category: 'props' | 'decos' | 'fondos'): Promise<string[]> {
    const imagesRef = ref(this.storage, `promotions/${category}/`);
    
    try {
      const listResult = await listAll(imagesRef);
      const imageUrls = await Promise.all(listResult.items.map(async item => {
        return await getDownloadURL(item);
      }));
      return imageUrls;
    } catch (error) {
      console.error('Error getting images:', error);
      throw error;
    }
  }

  async getAllPromotionalImages(): Promise<any[]> {
    const carruselCollection = collection(this.firestore, 'carrusel');
    try {
      const querySnapshot = await getDocs(carruselCollection);
      const imagesData = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const imageUrl = await this.getPromotionalImageUrl(data['imageName'], data['category']);
        return {
          ...data,
          ImageUrl: imageUrl
        };
      }));
      return imagesData;
    } catch (error) {
      console.error('Error getting promotional images from Firestore:', error);
      throw error;
    }
  }

  async deletePromotionalImage(imageName: string, category: 'props' | 'decos' | 'fondos'): Promise<void> {
    const imgRef = ref(this.storage, `promotions/${category}/${imageName}`);
  
    try {
      // Eliminar imagen de Firebase Storage
      await deleteObject(imgRef);
      console.log(`Deleted promotional image: ${imageName}`);
  
      // Buscar el documento en Firestore por el nombre de la imagen
      const querySnapshot = await getDocs(
        query(
          collection(this.firestore, `carrusel`),
          where('imageName', '==', imageName)
        )
      );
  
      // Si se encuentra el documento, se procede a eliminarlo
      querySnapshot.forEach(async (docSnapshot) => {
        await deleteDoc(docSnapshot.ref);
        console.log(`Deleted Firestore document with ID: ${docSnapshot.id} for promotional image: ${imageName}`);
      });
    } catch (error) {
      console.error('Error deleting promotional image or Firestore document:', error);
      throw error;
    }
  }

  // Obtener la URL de la imagen promocional
  async getPromotionalImageUrl(imageName: string, category: 'props' | 'decos' | 'fondos'): Promise<string> {
    const imgRef = ref(this.storage, `promotions/${category}/${imageName}`);
    return getDownloadURL(imgRef);
  }
}
