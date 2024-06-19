import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  estilosFondos: string[] = ['Estilo 1', 'Estilo 2', 'Estilo 3', 'Estilo 4'];
  props: string[] = ['Newborn', 'Aviones', 'Autos', 'Infantiles', 'Generales', 'Sillitas', 'Camitas'];
  decoraciones: string[] = ['Navidad', 'Pascua', 'Cumpleaños', 'Halloween', 'Boda'];

  openCategory: string = '';

  constructor(public router: Router, private filterService: FilterService) {}

  toggleCategory(category: string) {
    if (this.openCategory === category) {
      this.openCategory = '';
    } else {
      this.openCategory = category;
    }
  }

  isCategoryOpen(category: string): boolean {
    return this.openCategory === category;
  }

  filterBySubCategory(category: string, filter: string) {
    this.navigateToCategory(category);
  }

  navigateToCategory(category: string) {
    const routeMap: Record<string, string> = {
      fondo: 'fondos',
      prop: 'props',
      decoracion: 'decos'
    };
    if (routeMap[category]) {
      this.router.navigate([`/${routeMap[category]}`]);
    } else {
      console.error(`No route found for category: ${category}`);
    }
  }

  resetFilters() {
    this.openCategory = '';
    this.router.navigate(['/']);
  }
}
