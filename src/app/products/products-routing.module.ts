import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: ':category',
        children: [
          { path: ':id', component: ProductComponent }, // Ruta para producto específico
          { path: ':subcategory', component: ProductListComponent }, // Ruta para subcategoría
          { path: '', pathMatch: 'full', component: ProductListComponent }, // Ruta para categoría sin subcategoría
          { path: '**', redirectTo: 'props' } // Ruta por defecto dentro de ProductsComponent
        ]
      },
      { path: '**', redirectTo: '' } // Ruta por defecto dentro de ProductsComponent
    ]
  },
  { path: '**', redirectTo: '' } // Ruta por defecto global
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
