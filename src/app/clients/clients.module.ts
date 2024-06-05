import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { ClientsComponent } from './clients.component';
import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



@NgModule({
  declarations: [
    ClientsComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    RouterModule,
    SharedModule,
    NgbCarouselModule,
    NgbDropdownModule
  ]
})
export class ClientsModule { }
