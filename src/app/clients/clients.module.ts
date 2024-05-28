import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsComponent } from './clients.component';
import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    ClientsComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class ClientsModule { }
