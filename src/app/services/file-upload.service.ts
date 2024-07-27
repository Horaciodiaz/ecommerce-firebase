import { Injectable } from '@angular/core';
import  { Storage, ref, uploadBytes, deleteObject, getDownloadURL  } from '@angular/fire/storage'

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
    console.log("ESTAOASDASD")
    files.map(file => {
      console.log(file);
      const imgRef = ref(this.storage, `images/${folder}/${product}/${file.name}`);
      uploadBytes(imgRef, file)
      .then(res => console.log(res))
      .catch(error => console.log(error));
    });
  }

  deleteImage(imagenes: string[], folder: string, product: string){
    imagenes.map(imagen => {
      const imgRef = ref(this.storage,  `images/${folder}/${product}/${imagen}`);
      deleteObject(imgRef)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    })
  }

getImages(imagen: string ,folder: string, product: string){
  const imgRef = ref(this.storage, `images/${folder}/${product}/${imagen}`);
  return getDownloadURL(imgRef)
    .then( res => res )
    .catch( error => console.log(error) );
  }
}
