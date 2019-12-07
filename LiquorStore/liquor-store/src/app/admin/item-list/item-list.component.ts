import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Product } from 'src/model/product';
import { ProductService } from 'src/service/product.service';
import { LoginService } from 'src/service/login.service';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  productList: Product[];
  image: SafeResourceUrl;
  p: number = 1;

  constructor(
    private productService: ProductService,
    private loginService: LoginService,
    private sanitizer: DomSanitizer) {
    if (!this.loginService.isAdmin) {
      this.loginService.redirect();
    }
  }

  ngOnInit() {
    this.loadProducts();
  }


  deleteProduct(event, id) {
    console.log(id);
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    }, err => {
      console.log(err);
    });
  }

  
  loadProducts() {
    
    this.productService.getAllProducts().subscribe(res => {
    for (let i = 0; i < res.length; i++) {
      res[i].prod_imagem = this.sanitizer.bypassSecurityTrustUrl(res[i].prod_imagem);
    }
    this.productList = res;
  }, err => {
    console.log(err);
  });
  }
}


