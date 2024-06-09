import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    CarouselComponent
  ]
})
export class SharedModule { }
