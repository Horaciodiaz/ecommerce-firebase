import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  categories: { [key: string]: string[] } = {};
  category: string = '';
  openCategory: string = '';
  categoryKeys: string[] = []; // Para almacenar las claves de las categorías

  constructor(public router: Router, private route: ActivatedRoute, private filterService: FilterService) {}

  ngOnInit(): void {
    this.category = this.router.url.slice(11);
    this.loadCategories();
  }

  toggleCategory(category: string) {
    if (this.openCategory === category) {
      this.openCategory = '';
    } else {
      this.openCategory = category;
    }
  }

  private loadCategories() {
    this.filterService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
        this.categoryKeys = Object.keys(categories); // Obtener las claves de las categorías
        if (this.categoryKeys.includes(this.category)) {
          this.openCategory = this.category;
        }
      }
    );
  }

  filterBySubCategory(subcategory: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { subcategory },
      queryParamsHandling: 'merge',
    });
  }

  isCategoryOpen(category: string): boolean {
    return this.openCategory === category;
  }
}
