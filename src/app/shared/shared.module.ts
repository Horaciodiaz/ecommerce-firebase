import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { OrderDetailsComponent } from './order-details/order-details.component';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    OrderDetailsComponent
  ]
})
export class SharedModule { }
