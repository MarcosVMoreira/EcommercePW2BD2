import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ItemAddComponent } from './admin/item-add/item-add.component';
import { UserPageComponent } from './user-page/user-page.component';


const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "register",
    component: RegisterPageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "usuario",
    component: UserPageComponent
  },
  {
    path: "admin/item-add",
    component: ItemAddComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
