import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images = [
    {
      link: '../../../assets/aro.jpg',
      alt: "Aro new born",
      prioridad: "primero"
    },
    {
      link: '../../../assets/aro.jpg',
      alt: "Aro new born",
      prioridad: "segundo"
    },
    {
      link: '../../../assets/aro.jpg',
      alt: "Aro new born",
      prioridad: "tercero"
    },
    {
      link: '../../../assets/hamaca1.jpg',
      alt: "mi primera hamaca",
      prioridad: "segundo"
    },
    {
      link: '../../../assets/hamaca2.jpg',
      alt: "mi primera hamaca",
      prioridad: "cuarto"
    },
    {
      link: '../../../assets/hamaca3.jpg',
      alt: "mi primera hamaca",
      prioridad: "primero"
    }
  ];

  constructor( private firestore: AngularFirestore){}

  ngOnInit(){
    this.firestore.collection('carrusel').stateChanges().subscribe(
      fotos => {
        console.log(fotos.map( x => x.payload.doc.data() ))
      }
    );
  }
}
