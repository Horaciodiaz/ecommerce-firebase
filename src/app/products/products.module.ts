import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { FiltersComponent } from './components/filters/filters.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    CardComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
