import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ImagesComponent } from './components/images/images.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';



@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    ProductsComponent,
    OrdersComponent,
    ImagesComponent,
    TestimonialsComponent,
    DashboardComponent,
    ProductListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
