import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePageComponent } from "./home-page/home-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { ItemAddComponent } from "./admin/item-add/item-add.component";
import { ItemEditComponent } from "./admin/item-edit/item-edit.component";
import { UserPageComponent } from "./user-page/user-page.component";
import { PurchasesComponent } from "./user-page/purchases/purchases.component";
import { ItemListComponent } from "./admin/item-list/item-list.component";
import { ItemSearchComponent } from "./admin/item-search/item-search.component";
import { UserAddComponent } from "./admin/user-add/user-add.component";
import { UserListComponent } from "./admin/user-list/user-list.component";
import { UserSearchComponent } from "./admin/user-search/user-search.component";
import { StorePageComponent } from "./store/store-page/store-page.component";
import { BuyPageComponent } from "./store/store-page/buy-page/buy-page.component";
import { CartComponent } from "./cart/cart.component";
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "busca/:nomeProduto",
    component: SearchComponent
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
    path: "usuario/historico",
    component: PurchasesComponent
  },
  {
    path: "loja/:categoria",
    component: StorePageComponent,
    runGuardsAndResolvers: "always"
  },
  {
    path: "loja/:categoria/:id",
    component: BuyPageComponent
  },
  {
    path: "carrinho",
    component: CartComponent
  },
  {
    path: "admin/item-add",
    component: ItemAddComponent
  },
  {
    path: "admin/item-add-new",
    component: ItemAddComponent
  },
  {
    path: "admin/item-list",
    component: ItemListComponent
  },
  {
    path: "admin/item-search",
    component: ItemSearchComponent
  },
  {
    path: "admin/user-add",
    component: UserAddComponent
  },
  {
    path: "admin/user-list",
    component: UserListComponent
  },
  {
    path: "admin/user-edit/:prod_id",
    component: ItemEditComponent
  },
  {
    path: "admin/user-search",
    component: UserSearchComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
