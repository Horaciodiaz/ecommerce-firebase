import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginPageComponent } from './login-page.component';


const routes: Routes = [
    { path: '', component: LoginPageComponent, 
      children: [
      {
        path: '', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      { path: '**', redirectTo: '' }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
