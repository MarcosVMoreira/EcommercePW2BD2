import { Injectable } from '@angular/core';

import { Product } from 'src/model/product';
import { ProductService } from './product.service';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart: Product[] = [];

    constructor(
        private productApi: ProductService,
        private loginApi: LoginService) { }

    addToCart(id) {
        if (this.loginApi.isLogged) {
            this.productApi.getProductById(id).subscribe(res => {
                this.cart.push(res);
            }, err => {
                console.log(err);
            })
        } else {
            this.loginApi.login();
        }
    }
}
