import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  categories: string[] = [];
  category: string = '';
  openCategory: string = '';

  constructor(public router: Router, private filterService: FilterService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.category = this.router.url.slice(11);
  }

  toggleCategory(category: string) {
    if (this.openCategory === category) {
      this.openCategory = '';
    } else {
      this.openCategory = category;
      
      this.filterService.getCategories(category).subscribe(
        categories => {
          this.categories = categories;
          this.category = this.router.url.slice(11);
        }
      )
    }
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
