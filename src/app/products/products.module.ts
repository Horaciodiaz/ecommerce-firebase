import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductsService } from './services/products.service';
import { ProductsComponent } from './products.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    CardComponent,
    FiltersComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    HttpClientModule
  ]
})
export class ProductsModule { }
