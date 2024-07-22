import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './components/products/products.component';
import { ImagesComponent } from './components/images/images.component';
import { OrdersComponent } from './components/orders/orders.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'products', component: ProductsComponent, children: [
        { path: 'props', component: ProductListComponent },
        { path: 'fondos', component: ProductListComponent },
        { path: 'decos', component: ProductListComponent },
      ]},
      { path: 'orders', component: OrdersComponent },
      { path: 'images', component: ImagesComponent },
      { path: 'testimonials', component: TestimonialsComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
