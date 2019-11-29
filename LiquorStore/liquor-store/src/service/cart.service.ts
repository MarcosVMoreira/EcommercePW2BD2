import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
        private sanitizer: DomSanitizer) { }

    addToCart(id) {
        this.productApi.getProductById(id).subscribe(res => {
            res[0].prod_carrinho = 1;
            res[0].prod_imagem = this.sanitizer.bypassSecurityTrustUrl(res[0].prod_imagem);
            this.cart.push(res[0]);
        }, err => {
            console.log(err);
        });
    }

    reset() {
        this.cart = [];
    }

    isEmpty(): boolean {
        return this.cart.length === 0 ? true : false;
    }
}
