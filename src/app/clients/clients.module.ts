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
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    RouterModule,
    SharedModule,
  ]
})
export class ClientsModule { }
