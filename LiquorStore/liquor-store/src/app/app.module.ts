import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ItemAddComponent } from './admin/item-add/item-add.component';
import { UserPageComponent } from './user-page/user-page.component';
import { PurchasesComponent } from './user-page/purchases/purchases.component';
import { ItemListComponent } from './admin/item-list/item-list.component';
import { ItemSearchComponent } from './admin/item-search/item-search.component';
import { UserAddComponent } from './admin/user-add/user-add.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserSearchComponent } from './admin/user-search/user-search.component';
import { CervejaComponent } from './store/cerveja/cerveja.component';
import { ComprarCervejaComponent } from './store/cerveja/comprar-cerveja/comprar-cerveja.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    ItemAddComponent,
    UserPageComponent,
    PurchasesComponent,
    ItemListComponent,
    ItemSearchComponent,
    UserAddComponent,
    UserListComponent,
    UserSearchComponent,
    CervejaComponent,
    ComprarCervejaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot({ validation: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
