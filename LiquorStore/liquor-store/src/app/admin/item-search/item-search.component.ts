import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Product } from 'src/model/product';
import { ProductService } from 'src/service/product.service';
import { LoginService } from 'src/service/login.service';

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {
  productList: Product[];
  image: SafeResourceUrl;

  constructor(
    private productService: ProductService,
    private loginService: LoginService,
    private sanitizer: DomSanitizer) {
    if (!this.loginService.isAdmin) {
      this.loginService.redirect();
    }
  }

  ngOnInit() {
  }

  search(name) {
    this.productService.getProductsByName(name).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        res[i].prod_imagem = this.sanitizer.bypassSecurityTrustUrl(res[i].prod_imagem);
      }
      this.productList = res;
    }, err => {
      console.log(err);
    });
  }
}
