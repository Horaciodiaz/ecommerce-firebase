import { Injectable } from '@angular/core';
import  { Storage, ref, uploadBytes, deleteObject, getDownloadURL, updateMetadata  } from '@angular/fire/storage'

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: Storage) { }

  uploadImage(files: File[], folder: string, product: string)  {
    if (!files || !Array.isArray(files)) {
      console.error('files is undefined or not an array');
      return;
    }
    files.map(file => {
      console.log(file);
      const imgRef = ref(this.storage, `images/${folder}/${product}/${file.name}`);
      uploadBytes(imgRef, file)
      .then(res => console.log(res))
      .catch(error => console.log(error));
    });
  }
  deleteImage(imagenes: string[], folder: string, product: string): Promise<void> {
    const deletePromises = imagenes.map(imagen => {
      const imgRef = ref(this.storage, `images/${folder}/${product}/${imagen}`);
      return deleteObject(imgRef)
        .then(() => {
          console.log(`Deleted: ${imagen}`);
        })
        .catch(error => {
          console.error(`Error deleting ${imagen}:`, error);
          throw error; // Propagar el error para manejarlo después
        });
    });

    return Promise.all(deletePromises).then(() => {});
  }
  

getImages(imagen: string ,folder: string, product: string){
  const imgRef = ref(this.storage, `images/${folder}/${product}/${imagen}`);
  return getDownloadURL(imgRef)
    .then( res => res )
    .catch( error => console.log(error) );
  }
}
