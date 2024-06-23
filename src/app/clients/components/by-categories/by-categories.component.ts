import { Component } from '@angular/core';

@Component({
  selector: 'app-by-categories',
  templateUrl: './by-categories.component.html',
  styleUrls: ['./by-categories.component.css']
})
export class ByCategoriesComponent {
  decos = [
    {
      subcategory: "navidad",
      image: "../../../../assets/navidad.jpg" 
    },
    {
      subcategory: "pascuas",
      image: "../../../../assets/pascua.jpg" 
    },
    {
      subcategory: "otoño",
      image: "../../../../assets/otono.jpg" 
    },
    {
      subcategory: "playa",
      image: "../../../../assets/playa.jpg" 
    },
    {
      subcategory: "newborn",
      image: "../../../../assets/newborn.jpg" 
    },
    {
      subcategory: "florales",
      image: "../../../../assets/floral.jpg" 
    },
  ]
}
