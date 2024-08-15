import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ByCategoriesComponent } from './components/by-categories/by-categories.component';
import { TestimoniosComponent } from './components/testimonios/testimonios.component';
import { QuickContactComponent } from './components/quick-contact/quick-contact.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OrderCheckOutComponent } from './components/order-check-out/order-check-out.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { PaymentComponent } from './components/payment/payment.component';




@NgModule({
  declarations: [
    ClientsComponent,
    HomeComponent,
    ContactComponent,
    ShoppingCartComponent,
    ByCategoriesComponent,
    TestimoniosComponent,
    QuickContactComponent,
    CarouselComponent,
    CategoriesComponent,
    OrderCheckOutComponent,
    MyOrdersComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    RouterModule,
    SharedModule,
    SweetAlert2Module,
    ReactiveFormsModule 
  ]
})
export class ClientsModule { }
