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
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CardSkeletonComponent } from './components/card-skeleton/card-skeleton.component';
import { ProductSkeletonComponent } from './components/product-skeleton/product-skeleton.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    CardComponent,
    FiltersComponent,
    ProductsComponent,
    CardSkeletonComponent,
    ProductSkeletonComponent,
  ],
  imports: [
    CommonModule,
    // FormsModule,
    ProductsRoutingModule,
    HttpClientModule,
    SweetAlert2Module
  ]
})
export class ProductsModule { }
